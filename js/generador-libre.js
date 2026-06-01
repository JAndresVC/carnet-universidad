
const DEFAULT_STATE = {
    nombre: '', id: '', institucion: '',
    carrera1: '', carrera2: '',
    desde: '', hasta: '',
    foto: null, logo: null,
    colorFondo1: '#2C1B45',
    colorFondo2: '#3a2260',
    colorAccento: '#a78bfa',
    colorFecha: '#c8a84c',
    fuente: 'sans',
    barra: 'ulacit',
    radio: '18px',
    showGeo: true,
    showBarra: true,
    showQR: false,
    qrUrl: '',
    modoClaro: false
};

const state = Object.assign({}, DEFAULT_STATE);

function setFreeOrPlaceholder(el, value, placeholder) {
    if (value) {
        el.textContent = value;
        el.classList.remove('free-placeholder');
    } else {
        el.textContent = placeholder;
        el.classList.add('free-placeholder');
    }
}

async function updateFreeQR() {
    const scene = document.getElementById('free-cardScene');
    const qrContainer = scene.querySelector('#free-qr-small');
    if (state.showQR && state.qrUrl) {
        try {
            const dataUrl = await QRCode.toDataURL(state.qrUrl, {
                width: 38, margin: 0,
                color: { dark: '#000000', light: '#ffffff' }
            });
            scene.querySelector('#free-qr-div').innerHTML =
                `<img src="${dataUrl}" width="38" height="38" style="display:block;border-radius:3px;">`;
            qrContainer.style.display = 'flex';
        } catch(e) {
            qrContainer.style.display = 'none';
        }
    } else {
        qrContainer.style.display = 'none';
    }
}

function updateFreePreview() {
    const scene = document.getElementById('free-cardScene');
    const cardFront = scene.querySelector('#free-card-front');

    scene.style.setProperty('--free-color1', state.colorFondo1);
    scene.style.setProperty('--free-color2', state.colorFondo2);
    scene.style.setProperty('--free-accent', state.colorAccento);
    scene.style.setProperty('--free-fecha', state.colorFecha);

    const fonts = {
        sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
        serif: 'Georgia, "Times New Roman", Times, serif',
        mono: '"Courier New", Courier, monospace'
    };
    scene.style.fontFamily = fonts[state.fuente];

    cardFront.style.borderRadius = state.radio;

    scene.querySelector('#free-geo').style.display = state.showGeo ? '' : 'none';
    scene.classList.toggle('modo-claro', state.modoClaro);

    const bar = scene.querySelector('.front-colorbar');
    if (!state.showBarra || state.barra === 'none') {
        bar.style.display = 'none';
    } else {
        bar.style.display = '';
        switch (state.barra) {
            case 'ulacit':
                bar.style.background = 'linear-gradient(90deg,#5B55D6 0%,#5B55D6 25%,#2EBD6E 25%,#2EBD6E 50%,#7CC840 50%,#7CC840 75%,#F07840 75%,#F07840 100%)';
                break;
            case 'solid':
                bar.style.background = state.colorAccento;
                break;
            case 'gradient':
                bar.style.background = `linear-gradient(90deg, ${state.colorFondo1}, ${state.colorAccento})`;
                break;
            case 'rainbow':
                bar.style.background = 'linear-gradient(90deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff,#c77dff)';
                break;
        }
    }

    const solidPreview = document.getElementById('barra-solid-preview');
    if (solidPreview) solidPreview.style.background = state.colorAccento;
    const gradPreview = document.getElementById('barra-gradient-preview');
    if (gradPreview) gradPreview.style.background = `linear-gradient(90deg, ${state.colorFondo1}, ${state.colorAccento})`;

    setFreeOrPlaceholder(scene.querySelector('#free-name-display'), state.nombre, 'Nombre completo');
    setFreeOrPlaceholder(scene.querySelector('#free-id-display'), state.id, '0-0000-0000');

    const badge = scene.querySelector('#free-badge');
    badge.textContent = state.institucion || 'Institución';

    const logoImg = scene.querySelector('#free-logo-img');
    const instText = scene.querySelector('#free-inst-text');
    if (state.logo) {
        logoImg.style.display = 'block';
        instText.style.display = 'none';
    } else {
        logoImg.style.display = 'none';
        instText.style.display = 'block';
        setFreeOrPlaceholder(instText, state.institucion, 'Nombre de institución');
    }

    const c1 = scene.querySelector('#free-carrera1-display');
    const c2 = scene.querySelector('#free-carrera2-display');
    setFreeOrPlaceholder(c1, state.carrera1, 'Carrera o programa');
    if (state.carrera2) {
        c2.textContent = state.carrera2;
        c2.classList.remove('free-placeholder');
        c2.style.display = '';
    } else {
        c2.style.display = 'none';
    }

    const validEl = scene.querySelector('#free-validity-display');
    if (state.desde || state.hasta) {
        validEl.textContent = `${(state.desde || '???').toUpperCase()} / ${(state.hasta || '???').toUpperCase()}`;
        validEl.classList.remove('free-placeholder');
    } else {
        validEl.textContent = 'DESDE / HASTA';
        validEl.classList.add('free-placeholder');
    }

    updateFreeQR();
}

function setColor(key, value) {
    state[key] = value;
    updateFreePreview();
}

function setFont(font, btn) {
    state.fuente = font;
    document.querySelectorAll('.free-font-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateFreePreview();
}

function setBarra(barra, el) {
    state.barra = barra;
    document.querySelectorAll('.free-barra-opt').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    updateFreePreview();
}

function setShape(radius, el) {
    state.radio = radius;
    document.querySelectorAll('.free-shape-opt').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    updateFreePreview();
}

function toggleGeo(checked) { state.showGeo = checked; updateFreePreview(); }
function toggleBarra(checked) { state.showBarra = checked; updateFreePreview(); }
function toggleClaro(checked) { state.modoClaro = checked; updateFreePreview(); }

function toggleQR(checked) {
    state.showQR = checked;
    document.getElementById('free-qr-url-row').style.display = checked ? 'block' : 'none';
    updateFreePreview();
}

function setQRUrl(value) {
    state.qrUrl = value.trim();
    updateFreePreview();
}

function triggerFreePhoto(e) {
    e.stopPropagation();
    document.getElementById('free-photo-input').click();
}

function loadFreePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const label = document.getElementById('free-photo-filename');
    if (label) label.textContent = file.name;
    const reader = new FileReader();
    reader.onload = async e => {
        const base64 = await cropPhotoToCardRatio(e.target.result);
        state.foto = base64;
        const scene = document.getElementById('free-cardScene');
        const img = scene.querySelector('#free-photo-img');
        const hint = scene.querySelector('#free-photo-hint');
        img.src = base64;
        img.style.display = 'block';
        hint.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function loadFreeLogo(event) {
    const file = event.target.files[0];
    if (!file) return;
    const label = document.getElementById('free-logo-filename');
    if (label) label.textContent = file.name;
    const reader = new FileReader();
    reader.onload = e => {
        state.logo = e.target.result;
        const scene = document.getElementById('free-cardScene');
        const logoImg = scene.querySelector('#free-logo-img');
        logoImg.src = e.target.result;
        updateFreePreview();
    };
    reader.readAsDataURL(file);
}

async function saveFreeImage() {
    const btn = document.querySelector('.free-btn-save');
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Guardando…</span>';

    const scene = document.getElementById('free-cardScene');
    const front = scene.querySelector('.card-front');
    const EXPORT_SCALE = 6;
    const EXPORT_WIDTH = 400;
    const EXPORT_HEIGHT = 252;

    const makeSlug = str => str.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const instSlug = state.institucion ? makeSlug(state.institucion) : 'institucio';
    const nombreSlug = state.nombre ? makeSlug(state.nombre) : 'estudiante';
    const filename = `carne-${instSlug}-${nombreSlug}.png`;

    const prevWidth = scene.style.width;
    const prevHeight = scene.style.height;
    const photo = scene.querySelector('#free-photo-img');
    let prevSrc = null;
    let canvas;

    try {
        scene.style.width = `${EXPORT_WIDTH}px`;
        scene.style.height = `${EXPORT_HEIGHT}px`;

        if (state.foto) {
            prevSrc = photo.src;
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
        if (prevSrc !== null) photo.src = prevSrc;
        scene.style.width = prevWidth;
        scene.style.height = prevHeight;
        btn.disabled = false;
        btn.innerHTML = origHTML;
    }

    const a = document.createElement('a');
    a.download = filename;
    a.href = canvas.toDataURL('image/png');
    a.click();
}

function resetAll() {
    Object.assign(state, Object.assign({}, DEFAULT_STATE));
    state.foto = null;
    state.logo = null;

    ['free-nombre','free-id','free-institucion','free-carrera1','free-carrera2','free-desde','free-hasta']
        .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });

    document.getElementById('free-color1').value = DEFAULT_STATE.colorFondo1;
    document.getElementById('free-color2').value = DEFAULT_STATE.colorFondo2;
    document.getElementById('free-color-accent').value = DEFAULT_STATE.colorAccento;
    document.getElementById('free-color-fecha').value = DEFAULT_STATE.colorFecha;

    document.querySelectorAll('.free-font-btn').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.font === DEFAULT_STATE.fuente));
    document.querySelectorAll('.free-barra-opt').forEach(opt =>
        opt.classList.toggle('active', opt.dataset.barra === DEFAULT_STATE.barra));
    document.querySelectorAll('.free-shape-opt').forEach(opt =>
        opt.classList.toggle('active', opt.dataset.radius === DEFAULT_STATE.radio));

    document.getElementById('free-check-geo').checked = DEFAULT_STATE.showGeo;
    document.getElementById('free-check-barra').checked = DEFAULT_STATE.showBarra;
    document.getElementById('free-check-qr').checked = DEFAULT_STATE.showQR;
    document.getElementById('free-check-claro').checked = DEFAULT_STATE.modoClaro;

    document.getElementById('free-qr-url').value = '';
    document.getElementById('free-qr-url-row').style.display = 'none';

    const scene = document.getElementById('free-cardScene');
    const photo = scene.querySelector('#free-photo-img');
    photo.src = ''; photo.style.display = 'none';
    scene.querySelector('#free-photo-hint').style.display = '';

    const logoImg = scene.querySelector('#free-logo-img');
    logoImg.src = ''; logoImg.style.display = 'none';

    const photoLabel = document.getElementById('free-photo-filename');
    if (photoLabel) photoLabel.textContent = 'Elegir foto…';
    const logoLabel = document.getElementById('free-logo-filename');
    if (logoLabel) logoLabel.textContent = 'Elegir logo…';

    document.getElementById('free-photo-input').value = '';
    document.getElementById('free-logo-input').value = '';

    updateFreePreview();
}

document.addEventListener('DOMContentLoaded', () => {
    const fieldMap = {
        'free-nombre': 'nombre', 'free-id': 'id', 'free-institucion': 'institucion',
        'free-carrera1': 'carrera1', 'free-carrera2': 'carrera2',
        'free-desde': 'desde', 'free-hasta': 'hasta'
    };
    Object.keys(fieldMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', e => {
            state[fieldMap[id]] = e.target.value.trim();
            updateFreePreview();
        });
    });
    updateFreePreview();
});
