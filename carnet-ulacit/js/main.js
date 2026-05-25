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

function loadPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const img = new Image();
        img.onload = () => {
            /* Redimensionar a 1024x1024 con canvas */
            const SIZE = 1024;
            const canvas = document.createElement('canvas');
            canvas.width  = SIZE;
            canvas.height = SIZE;
            const ctx = canvas.getContext('2d');

            /* Recorte centrado (cover): mantiene proporcion sin deformar */
            const scale = Math.max(SIZE / img.width, SIZE / img.height);
            const sw = SIZE / scale;
            const sh = SIZE / scale;
            const sx = (img.width  - sw) / 2;
            const sy = (img.height - sh) / 2;

            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, SIZE, SIZE);

            const base64 = canvas.toDataURL('image/jpeg', 0.92);
            try { localStorage.setItem('carne_photo', base64); } catch(err) {}
            applyPhoto(base64);
        };
        img.src = e.target.result;
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
function flipCard() {
    document.getElementById('cardScene').classList.toggle('flipped');
}

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
   Dibuja el carné directamente en canvas 2D
   (sin html2canvas) para evitar problemas de
   renderizado de fuentes y layout CSS.
   Resolución: 1200×760 px (proporciones CR80).
════════════════════════════════════════════ */
async function saveAsImage() {
    const W = 1200, H = 760, R = 50;
    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    /* ── Helpers ── */
    function roundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    /* ── Fondo degradado ── */
    const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
    bg.addColorStop(0,   '#2c1a4e');
    bg.addColorStop(0.4, '#3a2260');
    bg.addColorStop(1,   '#2c1a4e');
    roundRect(0, 0, W, H, R);
    ctx.fillStyle = bg;
    ctx.fill();

    /* ── Patrón geométrico sutil (círculos/rectángulos en esquina) ── */
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    /* 4 cuadrantes */
    [[0,0],[180,0],[0,180],[180,180]].forEach(([ox,oy]) => {
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(W - 340 + ox, -30 + oy, 160, 160, 10)
                      : ctx.rect(W - 340 + ox, -30 + oy, 160, 160);
        ctx.stroke();
    });
    ctx.globalAlpha = 1;
    ctx.restore();

    /* ── Barra de colores inferior ── */
    const barH = 14, barY = H - barH;
    const colors = ['#7c3aed','#4ade80','#22d3ee','#f97316','#facc15'];
    const bw = W / colors.length;
    colors.forEach((c, i) => {
        ctx.fillStyle = c;
        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(i * bw + R, barY);
            ctx.lineTo((i+1)*bw, barY);
            ctx.lineTo((i+1)*bw, H);
            ctx.lineTo(i * bw, H);
            ctx.quadraticCurveTo(i * bw, barY, i * bw + R, barY);
            ctx.fill();
        } else if (i === colors.length - 1) {
            ctx.beginPath();
            ctx.moveTo(i * bw, barY);
            ctx.lineTo(i * bw + bw - R, barY);
            ctx.quadraticCurveTo(i * bw + bw, barY, i * bw + bw, barY + R);
            ctx.lineTo(i * bw + bw, H);
            ctx.lineTo(i * bw, H);
            ctx.fill();
        } else {
            ctx.fillRect(i * bw, barY, bw, barH);
        }
    });

    /* ── ULACIT logo texto ── */
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('ULACIT', 60, 110);

    /* ── Badge "Carné Estudiantil" ── */
    const badgeText = 'CARNÉ ESTUDIANTIL';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    const bTW = ctx.measureText(badgeText).width + 44;
    const bTX = W - bTW - 55, bTY = 58;
    roundRect(bTX, bTY, bTW, 44, 22);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(badgeText, bTX + 22, bTY + 30);

    /* ── Separador horizontal ── */
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, H - 130); ctx.lineTo(W - 60, H - 130); ctx.stroke();

    /* ── Foto ── */
    const photoSrc = document.getElementById('photo-img').src;
    const photoX = 55, photoY = 145, photoS = 240;
    roundRect(photoX, photoY, photoS, photoS, 14);
    ctx.save();
    ctx.clip();
    if (photoSrc && !photoSrc.endsWith('#')) {
        await new Promise(resolve => {
            const pImg = new Image();
            pImg.onload = () => { ctx.drawImage(pImg, photoX, photoY, photoS, photoS); resolve(); };
            pImg.onerror = resolve;
            pImg.src = photoSrc;
        });
    } else {
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();
    }
    ctx.restore();

    /* ── Titular label ── */
    ctx.fillStyle = '#a78bfa';
    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('TITULAR', 330, 178);

    /* ── Nombre ── */
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('Andrés Vargas Castillo', 330, 248);

    /* ── Programas académicos label ── */
    ctx.fillStyle = '#a78bfa';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('PROGRAMAS ACADÉMICOS', 330, 300);

    /* ── Carreras ── */
    ctx.fillStyle = '#ffffff';
    ctx.font = '400 28px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('▸  Bach. Mercadeo y Medios Digitales', 330, 346);
    ctx.fillText('▸  Bach. Publicidad · Prod. Multimedia', 330, 392);

    /* ── ID Estudiantil label ── */
    ctx.fillStyle = '#a78bfa';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('ID ESTUDIANTIL', 60, H - 155);

    /* ── Número ID ── */
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('7-0294-0499', 60, H - 95);

    /* ── Chip ── */
    const chipX = 62, chipY = H - 80;
    roundRect(chipX, chipY, 54, 42, 5);
    ctx.fillStyle = '#c9a84c';
    ctx.fill();
    ctx.strokeStyle = '#a07830';
    ctx.lineWidth = 1;
    /* Grid del chip */
    for (let ci = 0; ci < 3; ci++) {
        for (let cj = 0; cj < 3; cj++) {
            ctx.strokeRect(chipX + 4 + ci*17, chipY + 4 + cj*13, 13, 9);
        }
    }

    /* ── Válido hasta ── */
    ctx.fillStyle = '#a78bfa';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('VÁLIDO HASTA', W - 60, H - 155);
    ctx.fillStyle = '#f5c542';
    ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('ABRIL 2027', W - 60, H - 95);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '400 20px -apple-system, BlinkMacSystemFont, Arial, sans-serif';
    ctx.fillText('UNIVERSIDAD · COSTA RICA', W - 60, H - 65);
    ctx.textAlign = 'left';

    /* ── Descarga ── */
    const a = document.createElement('a');
    a.download = 'carne-ulacit-andres-vargas.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
}
