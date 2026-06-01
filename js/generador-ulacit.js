
function setOrPlaceholder(el, value, placeholder) {
    if (value) {
        el.textContent = value;
        el.classList.remove('gen-placeholder');
    } else {
        el.textContent = placeholder;
        el.classList.add('gen-placeholder');
    }
}

function updatePreview() {
    const nombre   = document.getElementById('gen-nombre').value.trim();
    const cedula   = document.getElementById('gen-id').value.trim();
    const carrera1 = document.getElementById('gen-carrera1').value.trim();
    const carrera2 = document.getElementById('gen-carrera2').value.trim();
    const desde    = document.getElementById('gen-desde').value.trim();
    const hasta    = document.getElementById('gen-hasta').value.trim();

    const scope = document.getElementById('gen-cardScene');

    setOrPlaceholder(scope.querySelector('.field-val.name'), nombre, 'Nombre del estudiante');
    setOrPlaceholder(scope.querySelector('.id-number'), cedula, '0-0000-0000');

    const items = scope.querySelectorAll('.career-item');
    setOrPlaceholder(items[0], carrera1, 'Programa académico');
    if (carrera2) {
        items[1].textContent = carrera2;
        items[1].classList.remove('gen-placeholder');
        items[1].style.display = '';
    } else {
        items[1].style.display = 'none';
    }

    const validityEl = scope.querySelector('.validity-date');
    if (desde || hasta) {
        validityEl.textContent = `${(desde || '???').toUpperCase()} / ${(hasta || '???').toUpperCase()}`;
        validityEl.classList.remove('gen-placeholder');
    } else {
        validityEl.textContent = 'DESDE / HASTA';
        validityEl.classList.add('gen-placeholder');
    }
}

function triggerGenPhoto(e) {
    e.stopPropagation();
    document.getElementById('gen-photo-input').click();
}

function loadGenPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const label = document.getElementById('gen-photo-filename');
    if (label) label.textContent = file.name;

    const reader = new FileReader();
    reader.onload = async e => {
        const base64 = await cropPhotoToCardRatio(e.target.result);
        const scope = document.getElementById('gen-cardScene');
        const img = scope.querySelector('#photo-img');
        const hint = scope.querySelector('.photo-hint');
        img.src = base64;
        img.style.display = 'block';
        hint.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

async function saveGenImage() {
    const btn = document.querySelector('.gen-btn-save');
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Guardando…</span>';

    const scope = document.getElementById('gen-cardScene');
    const front = scope.querySelector('.card-front');
    const EXPORT_SCALE = 6;
    const EXPORT_WIDTH  = 400;
    const EXPORT_HEIGHT = 252;

    const photo = scope.querySelector('#photo-img');
    const prevSrc    = photo ? photo.src : null;
    const prevWidth  = scope.style.width;
    const prevHeight = scope.style.height;

    const nombre = document.getElementById('gen-nombre').value.trim();
    const slug = nombre
        ? nombre.toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        : 'estudiante';
    const filename = `carne-ulacit-${slug}.png`;

    let canvas;
    try {
        scope.style.width  = `${EXPORT_WIDTH}px`;
        scope.style.height = `${EXPORT_HEIGHT}px`;

        if (photo && photo.src.startsWith('data:')) {
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
        if (photo && prevSrc !== null) photo.src = prevSrc;
        scope.style.width  = prevWidth;
        scope.style.height = prevHeight;
        btn.disabled = false;
        btn.innerHTML = origHTML;
    }

    const a = document.createElement('a');
    a.download = filename;
    a.href = canvas.toDataURL('image/png');
    a.click();
}

document.addEventListener('DOMContentLoaded', () => {
    ['gen-nombre','gen-id','gen-carrera1','gen-carrera2','gen-desde','gen-hasta'].forEach(id => {
        document.getElementById(id).addEventListener('input', updatePreview);
    });
    updatePreview();
});
