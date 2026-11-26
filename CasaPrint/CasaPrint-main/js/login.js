const formLogin = document.getElementById('form-login');
const campoUsuario = document.getElementById('usuario');
const campoPassword = document.getElementById('password');
const mensaje = document.getElementById('login-mensaje');
const btnRegistrar = document.getElementById('btn-registrar');

function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
  } catch (e) {
    return [];
  }
}

function mostrarMensaje(texto, esError) {
  mensaje.textContent = texto;
  mensaje.classList.toggle('login__mensaje--ok', !esError);
  mensaje.hidden = false;
}

function camposValidos() {
  if (campoUsuario.value.trim() === '' || campoPassword.value === '') {
    mostrarMensaje('Rellena el nombre y la contraseña.', true);
    return false;
  }
  return true;
}

// Login
formLogin.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!camposValidos()) {
    return;
  }

  const nombre = campoUsuario.value.trim();
  const usuario = obtenerUsuarios().find(function (u) {
    return u.nombre === nombre && u.password === campoPassword.value;
  });

  if (usuario) {
    localStorage.setItem('sesion', nombre);
    mostrarMensaje('Bienvenido, ' + nombre + '.', false);
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1000);
  } else {
    mostrarMensaje('Nombre o contraseña incorrectos.', true);
  }
});

// Registrar: ir a la página de registro
btnRegistrar.addEventListener('click', function () {
  window.location.href = 'registro.html';
});