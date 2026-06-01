document.addEventListener('DOMContentLoaded', function () {
    // Keyboard support for div-based interactive elements
    document.querySelectorAll('[role="button"]').forEach(function (el) {
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });

    // Hide decorative SVGs inside buttons and links from screen readers
    document.querySelectorAll('button svg, a svg, [role="button"] svg').forEach(function (svg) {
        if (!svg.getAttribute('role') && !svg.getAttribute('aria-label')) {
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('focusable', 'false');
        }
    });
});

function cropPhotoToCardRatio(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const W = 1520, H = 1900;
            const canvas = document.createElement('canvas');
            canvas.width = W; canvas.height = H;
            const ctx = canvas.getContext('2d');
            const scale = Math.max(W / img.width, H / img.height);
            const sw = W / scale, sh = H / scale;
            const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
            resolve(canvas.toDataURL('image/jpeg', 0.96));
        };
        img.onerror = () => resolve(src);
        img.src = src;
    });
}
