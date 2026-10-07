# TIHA — Tecnología con humanidad

Sitio web del modelo **TIHA** (Tecnologías para la Inspiración y Humanización del
Aprendizaje) y biblioteca de recursos interactivos de la **Dra. Mariluz Serrano Ortiz,
Ed.D.** — Catedrática Auxiliar, Universidad de Puerto Rico, Recinto de Río Piedras.

> *"Cuando integramos la inteligencia artificial con intención humanizadora, no solo
> aprendemos con ella: aprendemos a ser más nosotros mismos."* — TIHA

## Qué hay aquí

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Portada del sitio: el modelo, la investigación, las conferencias, el laboratorio de prompts, los cursos, la comunidad y el contacto. |
| `recursos.html` | Biblioteca TIHA: 116 recursos interactivos con buscador y filtros por colección. |
| `assets/tiha-base.css` | Hoja de estilos original del sitio TIHA, sin modificar. |
| `assets/tiha-extra.css` | Estilos de las secciones nuevas (biblioteca, frases oficiales, 404). |
| `assets/tiha.js` | Menú móvil, panel de Lumi, constructor de prompt y envío del formulario. |
| `assets/recursos.js` | Buscador y filtros de la biblioteca. |
| `assets/recursos-data.js` | Catálogo de los 116 recursos, generado automáticamente. |
| `brand/` | Logotipo oficial de TIHA. |
| `*.html` (raíz) | Los recursos interactivos: simuladores, laboratorios, rúbricas, bitácoras, recapitulaciones y análisis. |
| `DESPLIEGUE.md` | **Cómo publicar el sitio y anclar el dominio.** |

## Dónde está publicado

El sitio está publicado en <https://mariluzserrano-cmd.github.io/tiha/> y se
actualiza solo con cada cambio en `main`.

Vea **[DESPLIEGUE.md](DESPLIEGUE.md)** para la referencia de diseño destinada al
equipo que montará la versión definitiva, y para anclar un dominio más adelante.

## Ver el sitio en su computadora

```bash
python3 -m http.server 8000
```

Luego abra <http://localhost:8000>. Hace falta servirlo por HTTP: abrir `index.html` con
doble clic deja el buscador de la biblioteca sin funcionar.

## Las cuatro colecciones por contexto

Los 116 recursos están agrupados en 14 colecciones que cubren los cuatro contextos de
implementación del modelo: **academia**, **gobierno**, **empresa** y **familia**.

---

*"La inteligencia artificial no reemplaza al ser humano; lo potencia para trascender."*
Metodología TIHA · Dra. Mariluz Serrano Ortiz
