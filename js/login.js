const USUARIO = 'admin';
const CONTRASENA = 'ulacit2024';

function doLogin() {
    const user = document.getElementById('input-usuario').value.trim();
    const pass = document.getElementById('input-contrasena').value;
    const errorEl = document.getElementById('login-error');

    if (user === USUARIO && pass === CONTRASENA) {
        sessionStorage.setItem('ulacit_auth', '1');
        location.href = 'admin.html';
    } else {
        errorEl.textContent = 'Usuario o contraseña incorrectos.';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-login').addEventListener('click', doLogin);
    document.getElementById('input-usuario').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
    });
    document.getElementById('input-contrasena').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
    });
});
