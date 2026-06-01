const USUARIO = 'admin';
const CONTRASENA = 'ulacit2024';

const PROFILE = {
    nombre: 'Andrés Vargas Castillo',
    carreras: [
        'Bach. Mercadeo y Medios Digitales',
        'Bach. Publicidad con énfasis en Producción Multimedia'
    ],
    id: '7-0294-0499',
    idBarcode: '7 · 0294 · 0499',
    validez: 'MAYO 2022 / ABRIL 2027',
    telefono: '+506 4003-1391',
    whatsapp: '+506 8594-7526'
};

function doLogin() {
    const userEl = document.getElementById('input-usuario');
    const passEl = document.getElementById('input-contrasena');
    const errorEl = document.getElementById('login-error');

    if (userEl.value.trim() === USUARIO && passEl.value === CONTRASENA) {
        sessionStorage.setItem('ulacit_auth', '1');
        sessionStorage.setItem('ulacit_profile', JSON.stringify(PROFILE));
        location.href = 'admin.html';
    } else {
        errorEl.textContent = 'Usuario o contraseña incorrectos.';
        passEl.value = '';
        passEl.focus();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const errorEl = document.getElementById('login-error');
    const clearError = () => { errorEl.textContent = ''; };

    document.getElementById('btn-login').addEventListener('click', doLogin);
    document.getElementById('input-usuario').addEventListener('input', clearError);
    document.getElementById('input-usuario').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
    });
    document.getElementById('input-contrasena').addEventListener('input', clearError);
    document.getElementById('input-contrasena').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
    });
});
