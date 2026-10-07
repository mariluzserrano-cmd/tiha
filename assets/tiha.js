/* ============================================================
   TIHA · Interacciones de la portada
   Equivalente en JavaScript sin dependencias del prototipo
   original en React: menú móvil, Lumi, constructor de prompt
   y envío del formulario de contacto por correo.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Menú móvil ---------- */
  var botonMenu = document.querySelector(".menu-button");
  var nav = document.querySelector(".nav");
  if (botonMenu && nav) {
    botonMenu.addEventListener("click", function () {
      var abierto = nav.classList.toggle("open");
      botonMenu.setAttribute("aria-expanded", String(abierto));
    });
    nav.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) {
        nav.classList.remove("open");
        botonMenu.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Panel de Lumi ---------- */
  var rutasLumi = {
    modelo:
      "TIHA integra IA generativa, neuroeducación y pedagogía humanista desde cuatro pilares: inspiración, empatía, personalización y bienestar emocional.",
    investigación:
      "La base académica nace de la investigación doctoral de la Dra. Mariluz Serrano Ortiz y continúa creciendo mediante ponencias, artículos y evidencia de implementación.",
    recursos:
      "Visita el Laboratorio TIHA para construir un prompt humanizado, o entra a la Biblioteca TIHA: más de cien recursos interactivos usados en cursos, talleres y capacitaciones reales.",
    contacto:
      "Puedes solicitar una conferencia desde el formulario al final de la página. Prepararemos una experiencia adaptada a tu comunidad u organización."
  };

  var panel = document.querySelector(".lumi");
  var fab = document.querySelector(".lumi-fab");
  var mensaje = document.querySelector("[data-lumi-mensaje]");
  var cerrar = document.querySelector("[data-lumi-cerrar]");

  function mostrarLumi(visible) {
    if (!panel) return;
    panel.hidden = !visible;
    if (visible && cerrar) cerrar.focus();
    else if (fab) fab.focus();
  }

  if (fab) {
    fab.addEventListener("click", function () {
      mostrarLumi(panel.hidden);
    });
  }
  if (cerrar) {
    cerrar.addEventListener("click", function () {
      mostrarLumi(false);
    });
  }
  document.querySelectorAll("[data-lumi-abrir]").forEach(function (disparador) {
    disparador.addEventListener("click", function () {
      mostrarLumi(true);
    });
  });
  document.querySelectorAll("[data-lumi-ruta]").forEach(function (boton) {
    boton.addEventListener("click", function () {
      var texto = rutasLumi[boton.dataset.lumiRuta];
      if (texto && mensaje) mensaje.textContent = texto;
    });
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && panel && !panel.hidden) mostrarLumi(false);
  });

  /* ---------- Constructor de prompt humanizado ---------- */
  var publico = document.getElementById("lab-publico");
  var proposito = document.getElementById("lab-proposito");
  var tono = document.getElementById("lab-tono");
  var salida = document.getElementById("lab-salida");
  var copiar = document.getElementById("lab-copiar");

  function componerPrompt() {
    return (
      "Actúa como un facilitador de aprendizaje inspirado en el modelo TIHA. " +
      "Diseña una experiencia para " +
      (publico.value || "estudiantes universitarios") +
      " cuyo propósito sea " +
      (proposito.value || "comprender un concepto complejo") +
      ". Usa un tono " +
      tono.value +
      ". Integra empatía, opciones de personalización y una pausa de bienestar emocional. " +
      "Explica cómo la tecnología fortalece —sin sustituir— el acompañamiento humano."
    );
  }

  function refrescarPrompt() {
    if (salida) salida.textContent = componerPrompt();
  }

  if (publico && proposito && tono && salida) {
    [publico, proposito, tono].forEach(function (campo) {
      campo.addEventListener("input", refrescarPrompt);
      campo.addEventListener("change", refrescarPrompt);
    });
    refrescarPrompt();
  }

  if (copiar) {
    copiar.addEventListener("click", function () {
      var texto = componerPrompt();
      var etiqueta = copiar.textContent;

      function confirmar(exito) {
        copiar.textContent = exito ? "¡Copiado! ✓" : "Selecciona y copia el texto";
        setTimeout(function () {
          copiar.textContent = etiqueta;
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(
          function () {
            confirmar(true);
          },
          function () {
            confirmar(false);
          }
        );
      } else {
        confirmar(false);
      }
    });
  }

  /* ---------- Formulario de contacto (abre el correo ya redactado) ---------- */
  var formulario = document.getElementById("form-contacto");
  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      var datos = new FormData(formulario);
      var nombre = (datos.get("nombre") || "").trim();
      var correo = (datos.get("correo") || "").trim();
      var interes = datos.get("interes") || "";
      var detalle = (datos.get("detalle") || "").trim();

      var asunto = "TIHA · " + interes + (nombre ? " · " + nombre : "");
      var cuerpo =
        "Nombre: " + nombre + "\n" +
        "Correo: " + correo + "\n" +
        "Me interesa: " + interes + "\n\n" +
        detalle + "\n\n" +
        "— Enviado desde profmariluzserranoortiz.com";

      window.location.href =
        "mailto:mariluz.serrano@upr.edu?subject=" +
        encodeURIComponent(asunto) +
        "&body=" +
        encodeURIComponent(cuerpo);
    });
  }

  /* ---------- Marquesina duplicada para un desplazamiento continuo ---------- */
  var marquesina = document.querySelector("[data-marquesina]");
  if (marquesina && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    marquesina.classList.add("anima");
  }

  /* ---------- Año en curso en el pie ---------- */
  document.querySelectorAll("[data-anio]").forEach(function (nodo) {
    nodo.textContent = String(new Date().getFullYear());
  });
})();
