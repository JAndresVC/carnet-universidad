document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.nav-hamburger');
    const nav = document.querySelector('.ulacit-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    document.addEventListener('click', function (e) {
        if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
            nav.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Abrir menú');
        }
    });
});
