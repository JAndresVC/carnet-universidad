# 🎓 Carné Universitario Digital — ULACIT

> Plataforma web para generar carnés estudiantiles digitales. Nació porque ULACIT tiene el trámite de carné físico suspendido. Incluye panel de administrador privado, generador para estudiantes de ULACIT y generador libre para cualquier institución.

![Estado](https://img.shields.io/badge/estado-activo-brightgreen) ![Licencia](https://img.shields.io/badge/licencia-MIT-purple)

---

## 📋 Descripción

ULACIT no emite carné estudiantil activo, dejando a los estudiantes sin identificación institucional para museos, descuentos y otros servicios. Este proyecto resuelve eso con tres herramientas en una misma plataforma: un carné personal protegido por login, un generador para cualquier estudiante de ULACIT, y un editor libre para cualquier universidad.

Todo construido en HTML, CSS y JavaScript puro — sin frameworks, sin dependencias externas en tiempo de ejecución.

---

## ✨ Características

- **Login privado** con autenticación por sessionStorage — el carné personal solo lo ve el titular
- **Logo oficial de ULACIT** extraído del sitio institucional con colores de marca reales
- **Foto persistente** en `localStorage` — no hay que subirla de nuevo al reabrir
- **Preview en tiempo real** — el carné se actualiza mientras se escriben los datos
- **Exportación PNG** de alta resolución (2400×1512 px) vía html2canvas
- **PWA-ready** — se agrega a la pantalla de inicio del iPhone como app nativa
- **Funciona sin internet** — todas las librerías están incluidas localmente
- **Generador libre** con control total: colores, fuentes, logo propio, barra inferior, QR personalizado

---

## 📁 Estructura del proyecto

```
carnet-ulacit/
├── index.html                  # Página de login (entrada al admin)
├── admin.html                  # Carné personal del titular (protegido)
├── generador-ulacit.html       # Generador con template ULACIT fijo
├── generador-libre.html        # Generador libre para cualquier institución
├── css/
│   ├── styles.css              # Estilos del carné y layout general
│   └── nav.css                 # Navbar compartida entre páginas
├── js/
│   ├── login.js                # Lógica de autenticación
│   ├── main.js                 # Lógica del carné admin (QR, foto, barcode, export)
│   ├── generador-ulacit.js     # Lógica del generador ULACIT
│   └── generador-libre.js      # Lógica del generador libre (estado, colores, fuentes)
└── assets/
    └── js/
        ├── qrcode.min.js       # Librería QR (local, sin internet)
        └── html2canvas.min.js  # Librería de captura de pantalla
```

---

## 🔐 Acceso y autenticación

El panel de admin (`admin.html`) está protegido por login. Las credenciales están hardcodeadas en `js/login.js`:

```js
const USUARIO = 'admin';
const CONTRASENA = 'ulacit2024';
```

Para cambiar la contraseña, editá esas dos líneas directamente en `login.js`.

El sistema usa `sessionStorage` — al cerrar el navegador la sesión se cierra automáticamente.

> ⚠️ Esta autenticación es básica — suficiente para uso personal. Para producción con múltiples usuarios se recomienda migrar a Supabase Auth (ver sección de roadmap).

---

## 🚀 Páginas

### Página 1 — Login (`index.html`)
Pantalla de acceso privado con usuario y contraseña. Redirige a `admin.html` si las credenciales son correctas.

### Página 2 — Admin (`admin.html`)
El carné personal del titular. Acceso protegido. Contiene el carné completo tal como fue diseñado originalmente — foto persistente, QR a ulacit.ac.cr, botón de descarga PNG y panel de Apple Wallet.

### Página 3 — Generador ULACIT (`generador-ulacit.html`)
Mismo template del carné oficial con el logo institucional. El usuario puede modificar:
- Nombre completo
- Cédula / ID estudiantil
- Hasta dos carreras
- Período de validez (desde / hasta)
- Foto de perfil

El diseño, colores y logo de ULACIT **no se pueden modificar** — son fijos.

### Página 4 — Generador libre (`generador-libre.html`)
Editor completo para cualquier institución. Permite modificar:
- Todos los datos del carné
- Logo propio (PNG con transparencia)
- Foto del estudiante
- Colores (fondo, acento, texto de fecha)
- Fuente (sans, serif, mono)
- Barra de colores inferior (ULACIT, sólida, degradado, arcoíris, sin barra)
- Forma de la tarjeta (redondeada, muy redondeada, cuadrada)
- QR personalizado con URL propia
- Modo claro / fondo blanco
- Patrón geométrico de fondo (activable/desactivable)

---

## 📱 Usar en iPhone

1. Abrí la URL en **Safari**
2. Tocá el ícono de compartir → **"Añadir a pantalla de inicio"**
3. El carné queda como app con ícono propio en el home screen
4. Subí tu foto una vez — queda guardada automáticamente

---

## 🔄 Activar / desactivar el flip de tarjeta

El flip 3D está desactivado temporalmente pero el código está intacto. Para reactivarlo, son 4 ediciones manuales:

**1. `admin.html`** — agregar `onclick="flipCard()"` al div `.card-scene`:
```html
<div class="card-scene" id="cardScene" onclick="flipCard()">
```

**2. `admin.html`** — descomentar el párrafo `.tap-hint` (quitar `<!--` y `-->`):
```html
<!-- FLIP DESACTIVADO TEMPORALMENTE
<p class="tap-hint">↺ &nbsp; toca la tarjeta para voltear</p>
-->
```

**3. `js/main.js`** — descomentar `flipCard()` (quitar `/*` y `*/`):
```js
/* FLIP DESACTIVADO TEMPORALMENTE
function flipCard() {
    document.getElementById('cardScene').classList.toggle('flipped');
}
*/
```

**4. `css/styles.css`** — descomentar el bloque de animación (quitar `/*` y `*/`):
```css
/* FLIP DESACTIVADO TEMPORALMENTE
.card-scene.flipped .card-inner {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
}
*/
```

Para volver a desactivarlo, hacer el proceso inverso agregando los comentarios.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de todas las páginas |
| CSS3 | Flip 3D, animaciones, layout responsive, navbar |
| JavaScript ES6+ | Lógica, sessionStorage, localStorage, Canvas 2D |
| [QRCode.js](https://github.com/soldair/node-qrcode) | Generación del código QR |
| [html2canvas](https://html2canvas.hertzen.com/) | Exportación PNG de alta resolución |

---

## 🗺️ Roadmap

Funcionalidades planeadas para próximas versiones:

- [ ] **Hosting en Vercel** — dominio personalizado, disponible 24/7
- [ ] **Supabase Auth** — autenticación segura con base de datos real
- [ ] **Base de datos** — guardar carnés generados de forma persistente
- [ ] **Apple Wallet (.pkpass)** — requiere Apple Developer Program ($99/año)
- [ ] **Generador ULACIT multi-usuario** — que cada estudiante tenga su carné guardado

---

## 📱 Apple Wallet

El carné no se puede agregar al Apple Wallet nativo sin el Apple Developer Program ($99/año) y un servidor HTTPS con certificado firmado por Apple.

La alternativa funcional: agregar a pantalla de inicio desde Safari — visualmente equivalente para uso cotidiano.

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir con atribución.

---

> Desarrollado por **Andrés Vargas Castillo** · ULACIT · San José, Costa Rica
