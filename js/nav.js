document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.nav-hamburger');
    const nav = document.querySelector('.ulacit-nav');
    if (!hamburger || !nav) return;

    function openMenu() {
        nav.classList.add('nav-open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Cerrar menú');
        const firstLink = nav.querySelector('.nav-link');
        if (firstLink) firstLink.focus();
    }

    function closeMenu(returnFocus) {
        nav.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú');
        if (returnFocus) hamburger.focus();
    }

    hamburger.addEventListener('click', function () {
        nav.classList.contains('nav-open') ? closeMenu(false) : openMenu();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
            closeMenu(true);
        }
    });

    document.addEventListener('click', function (e) {
        if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
            closeMenu(false);
        }
    });
});
