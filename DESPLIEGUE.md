# Cómo publicar el sitio TIHA en su dominio

Guía para la Dra. Mariluz Serrano Ortiz · Dominio: **profmariluzserranoortiz.com**

Este sitio es **HTML estático**: no necesita compilarse, ni instalar nada, ni ejecutar
comandos. Se sube la carpeta tal como está y funciona. Eso le da una ventaja importante:
puede publicarlo en cualquier servicio, y mudarlo después sin rehacer nada.

| Dato | Valor |
| --- | --- |
| Peso total | 46 MB |
| Archivos | 133 |
| Archivo más grande | 5.3 MB |
| Paso de compilación | Ninguno |

---

## Recomendación: Cloudflare Pages

Es la opción que le recomiendo como primera. Razones concretas para su caso:

- **Gratis** y sin límite práctico de visitas.
- **Se conecta a GitHub**: cada vez que usted o yo actualicemos el repositorio, el sitio
  se republica solo. No hay que volver a subir archivos nunca.
- **El dominio se ancla en dos clics** y el certificado de seguridad (HTTPS) es automático.
- Entrega el sitio desde servidores cercanos a quien lo visita, así que carga rápido en
  Puerto Rico y en el resto del mundo.

### Pasos

1. Entre a [dash.cloudflare.com](https://dash.cloudflare.com) y cree una cuenta gratuita
   (o use la que ya tiene).
2. En el menú lateral: **Workers & Pages → Create → Pages → Connect to Git**.
3. Autorice a Cloudflare a leer su cuenta de GitHub y elija el repositorio
   **`mariluzserrano-cmd/tiha`**.
4. En la pantalla de configuración ponga exactamente esto:
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(déjelo vacío)*
   - **Build output directory**: `/`
5. Pulse **Save and Deploy**. En un minuto tendrá una dirección como
   `tiha.pages.dev`. Ábrala y revise que todo se vea bien.

### Anclar su dominio

6. Dentro del proyecto: pestaña **Custom domains → Set up a domain**.
7. Escriba `profmariluzserranoortiz.com` y confirme. Repita con `www.profmariluzserranoortiz.com`.
8. Cloudflare le dirá qué hacer según dónde esté registrado el dominio:
   - **Si el dominio ya está en Cloudflare**: no hay que hacer nada más, el registro DNS
     se crea solo.
   - **Si está en otro proveedor** (GoDaddy, Namecheap, Google Domains…): Cloudflare le
     mostrará un registro `CNAME` que usted copia y pega en el panel de su proveedor.
9. Espere entre unos minutos y unas horas a que el dominio propague. El HTTPS se activa solo.

---

## Alternativa igual de válida: GitHub Pages

Si prefiere no abrir cuenta en otro servicio, GitHub Pages publica este mismo repositorio
sin intermediarios. Es gratis y suficiente para el tamaño de su sitio.

### Pasos

1. En GitHub, abra el repositorio **`mariluzserrano-cmd/tiha`**.
2. **Settings → Pages**.
3. En **Build and deployment → Source** elija **Deploy from a branch**.
4. En **Branch** elija `main` y la carpeta `/ (root)`. Pulse **Save**.
5. A los pocos minutos el sitio estará en `https://mariluzserrano-cmd.github.io/tiha/`.

### Anclar su dominio

6. En esa misma pantalla, en **Custom domain**, escriba `profmariluzserranoortiz.com` y
   pulse **Save**. GitHub creará un archivo `CNAME` en el repositorio.
7. En el panel de su proveedor de dominio, cree estos registros:

   **Para el dominio sin `www`** (cuatro registros tipo `A`, todos apuntando al mismo sitio):

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

   **Para `www`** (un registro tipo `CNAME`):

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | CNAME | www | mariluzserrano-cmd.github.io |

   > Estas direcciones son las que GitHub publica para dominios propios, pero conviene
   > confirmarlas en su documentación al momento de configurar, por si cambian:
   > <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

8. De vuelta en **Settings → Pages**, marque **Enforce HTTPS** cuando la casilla se active
   (puede tardar hasta 24 horas en estar disponible).

---

## Comparación rápida

| | Cloudflare Pages | GitHub Pages |
| --- | --- | --- |
| Costo | Gratis | Gratis |
| Cuenta nueva | Sí | No |
| Se actualiza solo al editar el repositorio | Sí | Sí |
| Configuración del dominio | Un `CNAME` o automático | Cuatro `A` + un `CNAME` |
| Velocidad de entrega | Muy alta, red global | Buena |
| Límite de peso | 25 MB por archivo | 1 GB en total |

Ambas sirven. La diferencia real es que Cloudflare da más velocidad y una configuración de
dominio más sencilla; GitHub no le pide abrir otra cuenta.

---

## Revisar el sitio en su computadora antes de publicar

No basta con hacer doble clic en `index.html`: el sitio necesita servirse por HTTP para que
el buscador de la biblioteca funcione. Con Python instalado, abra una terminal en la carpeta
del proyecto y ejecute:

```bash
python3 -m http.server 8000
```

Luego visite <http://localhost:8000> en su navegador. Para detenerlo, pulse `Ctrl + C`.

---

## Qué hacer si quiere añadir un recurso nuevo

1. Suba el archivo `.html` nuevo a la raíz del repositorio.
2. Añádalo al catálogo: en `assets/recursos-data.js` hay una lista; o pídame a mí que
   regenere el catálogo y yo lo clasifico y actualizo el mapa del sitio.
3. Al subir el cambio a `main`, el sitio se republica solo.

---

## Nota sobre el formulario de contacto

El formulario de la sección **Conversemos** abre el programa de correo de quien lo usa, con
el mensaje ya redactado hacia `mariluz.serrano@upr.edu`. No guarda datos en ningún servidor
ni depende de terceros, y por eso funciona igual en cualquier alojamiento.

Si en algún momento prefiere que las solicitudes lleguen a una bandeja sin abrir el programa
de correo de la persona, se puede conectar un servicio de formularios. Es un cambio pequeño
y se lo puedo hacer cuando quiera.

---

*"No es usar más tecnología, es usar tecnología para vivir mejor."*
Dra. Mariluz Serrano Ortiz · Modelo TIHA · UPR Río Piedras · mariluz.serrano@upr.edu
