document.addEventListener('DOMContentLoaded', () => {
    // Si ya tiene una sesión activa, lo redirigimos directamente al listado
    if (localStorage.getItem('sesion_sopas') === 'activa') {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Credenciales de prueba / acceso local
    const USUARIO_CORRECTO = "admin";
    const CLAVE_CORRECTA = "1234";

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userVal = usuarioInput.value.trim();
        const passVal = passwordInput.value.trim();

        if (userVal === USUARIO_CORRECTO && passVal === CLAVE_CORRECTA) {
            // Guardar estado de sesión activa
            localStorage.setItem('sesion_sopas', 'activa');
            localStorage.setItem('usuario_sopas', userVal);

            // Redirigir al panel principal
            window.location.href = 'index.html';
        } else {
            // Mostrar mensaje de error
            errorMessage.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
});