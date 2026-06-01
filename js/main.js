/* ════════════════════════════════════════════
   PERFIL — cargado desde sessionStorage
════════════════════════════════════════════ */
(function() {
    let profile;
    try { profile = JSON.parse(sessionStorage.getItem('ulacit_profile')); } catch(e) {}
    if (!profile) return;

    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

    set('admin-nombre', profile.nombre);
    set('admin-id', profile.id);
    set('admin-validez', profile.validez);
    set('admin-telefono', profile.telefono);
    set('admin-whatsapp', profile.whatsapp);
    set('admin-barcode-text', profile.idBarcode);

    const [c1, c2] = profile.carreras;
    set('admin-carrera1', c1 || '');
    const c2el = document.getElementById('admin-carrera2');
    if (c2el) { c2el.textContent = c2 || ''; c2el.style.display = c2 ? '' : 'none'; }

    /* QR y fallback usan el ID del perfil */
    QRCode.toDataURL(
        'https://ulacit.ac.cr',
        { width: 88, margin: 1, color: { dark: '#1e0f35', light: '#ffffff' }, errorCorrectionLevel: 'M' }
    ).then(url => {
        const img = document.createElement('img');
        img.src = url; img.width = 88; img.height = 88; img.style.display = 'block';
        document.getElementById('qr-div').appendChild(img);
    }).catch(() => {
        document.getElementById('qr-div').innerHTML =
            `<div style="width:88px;height:88px;display:flex;align-items:center;justify-content:center;font-size:7px;color:#1e0f35;text-align:center;padding:4px;">${profile.id}</div>`;
    });
})();

/* ════════════════════════════════════════════
   CÓDIGO DE BARRAS
   Genera las barras usando un array de anchos
   predefinidos basado en el ID del perfil.
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
    const btn = document.querySelector('.btn-save');
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Guardando…</span>';

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

        if (photo.src.startsWith('data:')) {
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
        btn.disabled = false;
        btn.innerHTML = origHTML;
    }

    const nombre = document.getElementById('admin-nombre')?.textContent?.trim() || 'ulacit';
    const slug = nombre.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const a = document.createElement('a');
    a.download = `carne-ulacit-${slug}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
}
