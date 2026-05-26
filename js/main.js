/* ════════════════════════════════════════════
   CÓDIGO QR
   Genera un QR con el URL de ULACIT usando la
   API promise-based de qrcode (toDataURL).
   Si falla (offline sin lib), muestra el ID en texto.
════════════════════════════════════════════ */
QRCode.toDataURL(
    'https://ulacit.ac.cr',
    {
        width: 88,
        margin: 1,
        color: { dark: '#1e0f35', light: '#ffffff' },
        errorCorrectionLevel: 'M'
    }
).then(url => {
    const img = document.createElement('img');
    img.src = url;
    img.width = 88;
    img.height = 88;
    img.style.display = 'block';
    document.getElementById('qr-div').appendChild(img);
}).catch(() => {
    /* Fallback visual si la librería falla */
    document.getElementById('qr-div').innerHTML =
        '<div style="width:88px;height:88px;display:flex;align-items:center;justify-content:center;font-size:7px;color:#1e0f35;text-align:center;padding:4px;">7-0294-0499</div>';
});

/* ════════════════════════════════════════════
   CÓDIGO DE BARRAS
   Genera las barras usando un array de anchos
   predefinidos basado en el ID 7-0294-0499.
   Barras pares = oscuras, impares = transparentes.
════════════════════════════════════════════ */
(function() {
    const bars = document.getElementById('barcode-bars');
    let html = '';
    const seed = [2,1,3,1,2,1,1,3,2,2,1,2,3,1,1,2,1,3,2,1,2,1,3,1,2,2,1,1,3,2,1,2,1,3,1,1,2,2,3,1,2,1,2,1,3,2];
    seed.forEach((w, i) => {
        const px = w * 1.2;
        html += i % 2 === 0
            ? `<div style="width:${px}px;background:#1a0f2e;border-radius:0.5px;"></div>`
            : `<div style="width:${px}px;background:transparent;"></div>`;
    });
    bars.innerHTML = html;
})();

/* ════════════════════════════════════════════
   FOTO DE PERFIL
   triggerPhoto: abre el file picker sin propagar
                 el click al flip de tarjeta.
   applyPhoto:   muestra la imagen y oculta el hint.
   loadPhoto:    lee el archivo, guarda en localStorage
                 y aplica al DOM.
════════════════════════════════════════════ */
function triggerPhoto(e) {
    e.stopPropagation(); /* Evita que el click voltee la tarjeta */
    document.getElementById('photo-input').click();
}

function applyPhoto(base64) {
    const img = document.getElementById('photo-img');
    img.src = base64;
    img.style.display = 'block';
    document.getElementById('photo-hint').style.display = 'none';
}

function cropPhotoToCardRatio(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const W = 1520;
            const H = 1900;
            const canvas = document.createElement('canvas');
            canvas.width = W;
            canvas.height = H;
            const ctx = canvas.getContext('2d');

            const scale = Math.max(W / img.width, H / img.height);
            const sw = W / scale;
            const sh = H / scale;
            const sx = (img.width - sw) / 2;
            const sy = (img.height - sh) / 2;

            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
            resolve(canvas.toDataURL('image/jpeg', 0.96));
        };
        img.onerror = () => resolve(src);
        img.src = src;
    });
}

function loadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async e => {
        const base64 = await cropPhotoToCardRatio(e.target.result);
        try { localStorage.setItem('carne_photo', base64); } catch(err) {}
        applyPhoto(base64);
    };
    reader.readAsDataURL(file);
}

/* ════════════════════════════════════════════
   PERSISTENCIA DE FOTO — localStorage
   Al cargar la página restaura automáticamente
   la foto guardada sin que el usuario tenga que
   subirla de nuevo.
════════════════════════════════════════════ */
(function() {
    try {
        const saved = localStorage.getItem('carne_photo');
        if (saved) applyPhoto(saved);
    } catch(err) {}
})();

/* ════════════════════════════════════════════
   FLIP DE TARJETA
   Alterna la clase .flipped en .card-scene.
   CSS hace el resto: rotateY(180deg) con
   transition cubic-bezier para animación suave.
════════════════════════════════════════════ */
/* FLIP DESACTIVADO TEMPORALMENTE
function flipCard() {
    document.getElementById('cardScene').classList.toggle('flipped');
}
*/

/* ════════════════════════════════════════════
   PANEL DE APPLE WALLET
   Toggle simple de display block/none.
════════════════════════════════════════════ */
function toggleWallet() {
    const p = document.getElementById('walletPanel');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

/* ════════════════════════════════════════════
   GUARDAR COMO IMAGEN PNG
   Captura el frente real del carné con el diseño
   actual. El tamaño final es 2400×1512 px:
   6x la tarjeta visible de 400×252 px.
════════════════════════════════════════════ */
async function saveAsImage() {
    const front = document.querySelector('.card-front');
    const scene = document.getElementById('cardScene');
    const EXPORT_SCALE = 6;
    const EXPORT_WIDTH = 400;
    const EXPORT_HEIGHT = 252;
    const wasFlipped = scene.classList.contains('flipped');
    const previousWidth = scene.style.width;
    const previousHeight = scene.style.height;
    const photo = document.getElementById('photo-img');
    const previousPhotoSrc = photo.src;

    let canvas;

    try {
        if (wasFlipped) scene.classList.remove('flipped');
        scene.style.width = `${EXPORT_WIDTH}px`;
        scene.style.height = `${EXPORT_HEIGHT}px`;

        if (photo.src) {
            photo.src = await cropPhotoToCardRatio(photo.src);
        }

        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        canvas = await html2canvas(front, {
            backgroundColor: null,
            scale: EXPORT_SCALE,
            width: EXPORT_WIDTH,
            height: EXPORT_HEIGHT,
            windowWidth: EXPORT_WIDTH,
            windowHeight: EXPORT_HEIGHT,
            useCORS: true,
            logging: false
        });
    } finally {
        photo.src = previousPhotoSrc;
        scene.style.width = previousWidth;
        scene.style.height = previousHeight;
        if (wasFlipped) scene.classList.add('flipped');
    }

    const a = document.createElement('a');
    a.download = 'carne-ulacit-andres-vargas.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
}
