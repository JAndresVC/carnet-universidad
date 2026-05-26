# 🎓 Carné Universitario Digital — ULACIT

> Carné estudiantil digital para universidades que no emiten uno físico. Funciona como PWA en iPhone y Android, con soporte offline y exportación en PNG de alta resolución.

![Estado](https://img.shields.io/badge/estado-activo-brightgreen) ![Licencia](https://img.shields.io/badge/licencia-MIT-purple)

---

## 📋 Descripción

Este proyecto nació porque **ULACIT tiene el trámite de carné estudiantil suspendido**, dejando a los estudiantes sin identificación institucional para museos, descuentos y otros servicios. Es un carné digital 100% funcional, construido en HTML, CSS y JavaScript puro — sin frameworks, sin dependencias externas en tiempo de ejecución.

---

## ✨ Características

- **Logo oficial de ULACIT** extraído del sitio web institucional con colores de marca reales
- **Foto persistente** — se guarda automáticamente en `localStorage`, no hay que subirla de nuevo al reabrir
- **QR de verificación** apuntando a `ulacit.ac.cr`
- **Exportación PNG** de alta resolución (2400×1512 px) dibujada directamente en Canvas 2D
- **PWA-ready** — se puede agregar a la pantalla de inicio del iPhone como app nativa
- **Funciona sin internet** — todas las librerías están incluidas localmente
- **Flip de tarjeta 3D** (actualmente desactivado, reactivable manualmente)

---

## 📁 Estructura del proyecto

```
carnet-ulacit/
├── index.html              # Estructura HTML del carné
├── css/
│   └── styles.css          # Estilos, animaciones y layout
├── js/
│   └── main.js             # Lógica: QR, barcode, foto, flip, exportación
└── assets/
    └── js/
        ├── qrcode.min.js       # Librería QR (local, sin internet)
        └── html2canvas.min.js  # Librería de captura (local, sin internet)
```

---

## 🚀 Cómo usar

### En computadora
1. Cloná o descargá el repositorio
2. Abrí `index.html` en cualquier navegador moderno
3. Tocá el cuadro de foto para subir tu imagen
4. La foto queda guardada automáticamente para la próxima vez

### En iPhone (recomendado)
1. Abrí la URL de GitHub Pages en **Safari**:
   ```
   https://jandresvc.github.io/carnet-universidad/carnet-ulacit/
   ```
2. Tocá el ícono de compartir → **"Añadir a pantalla de inicio"**
3. El carné queda como una app en tu home screen con ícono propio
4. Abrilo, subí tu foto una vez y ya queda guardada

### Guardar como imagen
- Dale al botón **"Guardar imagen"** para descargar el carné en PNG de alta resolución
- La imagen se genera directamente en Canvas — sin dependencia de html2canvas para el export final

---

## 🔧 Personalización

Para adaptar el carné a otro estudiante, editá estas líneas en `index.html`:

```html
<!-- Nombre -->
<span class="field-val name">Andrés Vargas Castillo</span>

<!-- Carreras -->
<div class="career-item">Bach. Mercadeo y Medios Digitales</div>
<div class="career-item">Bach. Publicidad con énfasis en Producción Multimedia</div>

<!-- ID / cédula -->
<span class="id-number">7-0294-0499</span>

<!-- Período de validez -->
<div class="validity-date">MAYO 2022 — ABRIL 2027</div>
```

Y en `main.js` actualizá el número en el barcode y el fallback del QR:
```js
// Línea del barcode text
<div class="barcode-text">7 · 0294 · 0499</div>  // en index.html

// Fallback QR (si falla la librería)
'<div ...>7-0294-0499</div>'  // en main.js
```

---

## 🔄 Activar / desactivar el flip de tarjeta

El flip 3D está **desactivado temporalmente** pero el código está intacto. Para manejarlo manualmente:

### ▶️ Reactivar el flip

**1. `index.html`** — buscar el div `.card-scene` y agregar el onclick:
```html
<!-- ANTES (desactivado) -->
<div class="card-scene" id="cardScene">

<!-- DESPUÉS (activado) -->
<div class="card-scene" id="cardScene" onclick="flipCard()">
```

**2. `index.html`** — descomentar el mensaje de voltear (quitar `<!--` y `-->`):
```html
<!-- FLIP DESACTIVADO TEMPORALMENTE
<p class="tap-hint">↺ &nbsp; toca la tarjeta para voltear</p>
-->
```

**3. `main.js`** — descomentar la función flipCard (quitar `/*` y `*/`):
```js
/* FLIP DESACTIVADO TEMPORALMENTE
function flipCard() {
    document.getElementById('cardScene').classList.toggle('flipped');
}
*/
```

**4. `styles.css`** — descomentar el bloque de animación (quitar `/*` y `*/`):
```css
/* FLIP DESACTIVADO TEMPORALMENTE
.card-scene.flipped .card-inner {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
}
*/
```

### ⏸️ Desactivar el flip
Hacer el proceso inverso: agregar los comentarios `<!--` / `-->` en HTML y `/*` / `*/` en JS y CSS.

---

## 📱 Apple Wallet

El carné **no se puede agregar al Apple Wallet nativo** sin pagar el Apple Developer Program ($99/año) y configurar un servidor con certificado firmado por Apple.

La alternativa funcional es agregarlo a la pantalla de inicio desde Safari — visualmente equivalente para uso cotidiano.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura del carné |
| CSS3 | Flip 3D, animaciones, layout responsive |
| JavaScript ES6+ | Lógica, localStorage, Canvas 2D |
| [QRCode.js](https://github.com/soldair/node-qrcode) | Generación del código QR |
| [html2canvas](https://html2canvas.hertzen.com/) | Captura de pantalla (backup) |

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir con atribución.

---

> Desarrollado por **Andrés Vargas Castillo** · ULACIT · San José, Costa Rica
