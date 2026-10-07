# El sitio TIHA: dónde vive y cómo se actualiza

Dra. Mariluz Serrano Ortiz · Modelo TIHA

## Está publicado aquí

**https://mariluzserrano-cmd.github.io/tiha/**

GitHub Pages publica este repositorio automáticamente. Cada vez que algo cambia en la
rama `main`, el sitio se vuelve a publicar solo en un par de minutos. No hay que subir
archivos, ni compilar, ni ejecutar comandos.

| | |
| --- | --- |
| Portada | <https://mariluzserrano-cmd.github.io/tiha/> |
| Biblioteca de recursos | <https://mariluzserrano-cmd.github.io/tiha/recursos.html> |
| Peso total | 46 MB · 134 archivos |
| Paso de compilación | Ninguno |

---

## Para el equipo de diseño

Este sitio sirve de referencia visual y funcional para montar la versión definitiva en
Squarespace. Lo que conviene mirar:

- **La portada** tiene ocho secciones numeradas, en este orden: el modelo y sus cuatro
  pilares, investigación y evidencia, conferencias, el Laboratorio de prompts, cursos,
  la biblioteca, comunidad y contacto.
- **El Laboratorio de prompts** (la franja color salvia) y **Lumi** (el botón amarillo
  abajo a la derecha) son las dos piezas interactivas del sitio. Están escritas en
  JavaScript sin dependencias, así que su lógica se puede leer directamente en
  `assets/tiha.js` y trasladarse a cualquier plataforma.
- **La paleta y la tipografía** están declaradas al inicio de `assets/tiha-base.css`,
  en el bloque `:root`:

  | Token | Color | Uso |
  | --- | --- | --- |
  | `--cream` | `#f8eee3` | Fondo general |
  | `--paper` | `#fffaf5` | Tarjetas y superficies |
  | `--ink` | `#3a5672` | Texto y secciones oscuras |
  | `--sage` | `#baced7` | Franja del Laboratorio |
  | `--gold` | `#daa623` | Acentos y énfasis |
  | `--yellow` | `#f7d35a` | Lumi y detalles |

  Los títulos van en **Georgia** (serif, cursiva para el énfasis) y el texto corrido en
  **Arial**. Ambas son tipografías de sistema: no hay fuentes que licenciar.

- **La biblioteca** se genera a partir de `assets/recursos-data.js`, un catálogo de 116
  recursos en 14 colecciones. Si el sitio se rehace en otra plataforma, ese archivo es
  la lista completa, ya clasificada.

---

## Si algún día quiere su propio dominio

El sitio está listo para ello; es cuestión de dos pasos.

### Con GitHub Pages (lo que ya tiene)

1. En GitHub: **Settings → Pages → Custom domain**, escriba el dominio y guarde.
2. En el panel de su proveedor de dominio, cree estos registros:

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | mariluzserrano-cmd.github.io |

   > Conviene confirmar esas direcciones en la documentación de GitHub al momento de
   > configurar, por si cambian:
   > <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

3. De vuelta en **Settings → Pages**, marque **Enforce HTTPS** cuando la casilla se active.

### Con Cloudflare Pages

Alternativa más rápida de entrega y con una configuración de dominio más simple. En
[dash.cloudflare.com](https://dash.cloudflare.com): **Workers & Pages → Create → Pages →
Connect to Git**, elija este repositorio, rama `main`, framework **None**, comando de
compilación **vacío**, carpeta de salida `/`. Luego **Custom domains → Set up a domain**.

---

## Revisar el sitio en su computadora

No basta con hacer doble clic en `index.html`: el buscador de la biblioteca necesita que
el sitio se sirva por HTTP. Con Python instalado, en la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego visite <http://localhost:8000>. Para detenerlo, `Ctrl + C`.

---

## Añadir un recurso nuevo

1. Suba el archivo `.html` a la raíz del repositorio.
2. Pídame que regenere el catálogo: lo clasifico en su colección y actualizo el mapa del
   sitio. (También puede editar `assets/recursos-data.js` a mano.)
3. Al llegar el cambio a `main`, el sitio se republica solo.

---

## Visibilidad

El repositorio es público, así que el sitio y sus 116 recursos son accesibles para
cualquiera que tenga el enlace, y con el tiempo aparecerán en buscadores. Si prefiere que
sigan disponibles para quien tenga la dirección pero **sin indexarse en Google**, basta con
retirar `sitemap.xml` y cambiar `robots.txt` a `Disallow: /`.

---

## El formulario de contacto

Abre el programa de correo de quien lo usa con el mensaje ya redactado hacia
`mariluz.serrano@upr.edu`. No guarda datos ni depende de terceros, y por eso funciona
igual en cualquier alojamiento.

---

*"No es usar más tecnología, es usar tecnología para vivir mejor."*
Dra. Mariluz Serrano Ortiz · Modelo TIHA · UPR Río Piedras · mariluz.serrano@upr.edu
