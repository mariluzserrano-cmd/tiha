/* ============================================================
   TIHA · Biblioteca de recursos
   Dibuja el catálogo, filtra por colección y busca por texto.
   Los datos vienen de assets/recursos-data.js (window.TIHA_CATALOGO).
   ============================================================ */
(function () {
  "use strict";

  var datos = window.TIHA_CATALOGO;
  if (!datos) return;

  var contenedor = document.getElementById("catalogo");
  var barraFiltros = document.getElementById("filtros");
  var campoBusqueda = document.getElementById("busqueda");
  var conteo = document.getElementById("conteo");
  var sinResultados = document.getElementById("sin-resultados");

  var categoriaActiva = "todas";

  /* Quita acentos y pasa a minúsculas, para que "neurociencia"
     encuentre también "Neurociencía" y "EDU690" encuentre "EDU 690". */
  function normalizar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  var nombreCategoria = {};
  datos.categorias.forEach(function (categoria) {
    nombreCategoria[categoria.id] = categoria.nombre;
  });

  /* Índice de búsqueda: título + nombre de la colección + nombre del archivo */
  datos.recursos.forEach(function (recurso) {
    recurso.indice = normalizar(
      recurso.titulo + " " + nombreCategoria[recurso.cat] + " " + recurso.archivo
    );
  });

  /* ---------- Botones de filtro ---------- */
  function construirFiltros() {
    var fragmento = document.createDocumentFragment();

    function crearBoton(id, etiqueta, cantidad) {
      var boton = document.createElement("button");
      boton.type = "button";
      boton.textContent = etiqueta + " · " + cantidad;
      boton.dataset.categoria = id;
      boton.setAttribute("aria-pressed", String(id === categoriaActiva));
      boton.addEventListener("click", function () {
        categoriaActiva = id;
        if (campoBusqueda.value) campoBusqueda.value = "";
        actualizarFiltros();
        dibujar();
        contenedor.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return boton;
    }

    fragmento.appendChild(crearBoton("todas", "Todas", datos.recursos.length));
    datos.categorias.forEach(function (categoria) {
      var cantidad = datos.recursos.filter(function (recurso) {
        return recurso.cat === categoria.id;
      }).length;
      if (cantidad) fragmento.appendChild(crearBoton(categoria.id, categoria.nombre, cantidad));
    });
    barraFiltros.appendChild(fragmento);
  }

  function actualizarFiltros() {
    barraFiltros.querySelectorAll("button").forEach(function (boton) {
      boton.setAttribute("aria-pressed", String(boton.dataset.categoria === categoriaActiva));
    });
  }

  /* ---------- Resalta el término buscado sin inyectar HTML ---------- */
  function pintarTitulo(destino, titulo, terminos) {
    destino.textContent = "";
    if (!terminos.length) {
      destino.textContent = titulo;
      return;
    }
    var tituloNormalizado = normalizar(titulo);
    var termino = terminos[0];
    var posicion = tituloNormalizado.indexOf(termino);
    if (posicion === -1 || termino.length < 2) {
      destino.textContent = titulo;
      return;
    }
    /* La normalización conserva la longitud por carácter salvo en los
       separadores colapsados, así que acotamos el recorte al título real. */
    var inicio = Math.min(posicion, titulo.length);
    var fin = Math.min(posicion + termino.length, titulo.length);
    destino.appendChild(document.createTextNode(titulo.slice(0, inicio)));
    var marca = document.createElement("mark");
    marca.textContent = titulo.slice(inicio, fin);
    destino.appendChild(marca);
    destino.appendChild(document.createTextNode(titulo.slice(fin)));
  }

  /* ---------- Dibujar el catálogo ---------- */
  function dibujar() {
    var consulta = normalizar(campoBusqueda.value);
    var terminos = consulta ? consulta.split(" ").filter(Boolean) : [];

    var visibles = datos.recursos.filter(function (recurso) {
      if (categoriaActiva !== "todas" && recurso.cat !== categoriaActiva) return false;
      return terminos.every(function (termino) {
        return recurso.indice.indexOf(termino) !== -1;
      });
    });

    contenedor.textContent = "";
    var fragmento = document.createDocumentFragment();

    datos.categorias.forEach(function (categoria) {
      var deLaCategoria = visibles.filter(function (recurso) {
        return recurso.cat === categoria.id;
      });
      if (!deLaCategoria.length) return;

      var grupo = document.createElement("section");
      grupo.className = "catalogo-grupo";
      grupo.id = categoria.id;

      var cabecera = document.createElement("header");
      var indicador = document.createElement("b");
      indicador.textContent = deLaCategoria.length + (deLaCategoria.length === 1 ? " RECURSO" : " RECURSOS");
      var titulo = document.createElement("h2");
      titulo.textContent = categoria.nombre;
      var descripcion = document.createElement("p");
      descripcion.textContent = categoria.descripcion;
      cabecera.appendChild(indicador);
      cabecera.appendChild(titulo);
      cabecera.appendChild(descripcion);
      grupo.appendChild(cabecera);

      var rejilla = document.createElement("div");
      rejilla.className = "tarjetas";
      deLaCategoria.forEach(function (recurso) {
        var enlace = document.createElement("a");
        enlace.href = recurso.url;
        var nombre = document.createElement("b");
        pintarTitulo(nombre, recurso.titulo, terminos);
        var pie = document.createElement("footer");
        var abrir = document.createElement("span");
        abrir.textContent = "Abrir →";
        var peso = document.createElement("em");
        peso.textContent = recurso.kb + " KB";
        peso.style.fontStyle = "normal";
        peso.style.color = "inherit";
        pie.appendChild(abrir);
        pie.appendChild(peso);
        enlace.appendChild(nombre);
        enlace.appendChild(pie);
        rejilla.appendChild(enlace);
      });
      grupo.appendChild(rejilla);
      fragmento.appendChild(grupo);
    });

    contenedor.appendChild(fragmento);
    sinResultados.hidden = visibles.length > 0;
    conteo.textContent =
      visibles.length === datos.recursos.length
        ? datos.recursos.length + " recursos"
        : visibles.length + " de " + datos.recursos.length;
  }

  /* ---------- Enlace directo a una colección: recursos.html#allied ---------- */
  function leerAncla() {
    var ancla = decodeURIComponent(window.location.hash.replace("#", ""));
    if (ancla && nombreCategoria[ancla]) categoriaActiva = ancla;
  }

  leerAncla();
  construirFiltros();
  dibujar();

  var temporizador;
  campoBusqueda.addEventListener("input", function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(dibujar, 120);
  });

  window.addEventListener("hashchange", function () {
    leerAncla();
    actualizarFiltros();
    dibujar();
  });
})();
