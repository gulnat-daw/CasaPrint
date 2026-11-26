const formRegistro = document.getElementById('form-registro');
const campoNombre = document.getElementById('nombre');
const campoCorreo = document.getElementById('correo');
const campoPassword = document.getElementById('password');
const campoPassword2 = document.getElementById('password2');
const mensaje = document.getElementById('registro-mensaje');

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

formRegistro.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = campoNombre.value.trim();
  const correo = campoCorreo.value.trim().toLowerCase();
  const password = campoPassword.value;
  const password2 = campoPassword2.value;

  if (nombre === '' || correo === '' || password === '' || password2 === '') {
    mostrarMensaje('Rellena todos los campos.', true);
    return;
  }

  if (!campoCorreo.checkValidity()) {
    mostrarMensaje('Escribe un correo válido.', true);
    return;
  }

  if (password.length < 6) {
    mostrarMensaje('La contraseña debe tener al menos 6 caracteres.', true);
    return;
  }

  if (password !== password2) {
    mostrarMensaje('Las contraseñas no coinciden.', true);
    return;
  }

  const usuarios = obtenerUsuarios();

  const nombreUsado = usuarios.some(function (u) {
    return u.nombre === nombre;
  });
  const correoUsado = usuarios.some(function (u) {
    return u.correo === correo;
  });

  if (nombreUsado) {
    mostrarMensaje('Ese nombre ya está registrado.', true);
    return;
  }

  if (correoUsado) {
    mostrarMensaje('Ese correo ya está registrado.', true);
    return;
  }

  usuarios.push({ nombre: nombre, correo: correo, password: password });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  mostrarMensaje('Cuenta creada. Te llevamos al inicio de sesión...', false);
  formRegistro.reset();

  setTimeout(function () {
    window.location.href = 'cuenta.html';
  }, 1500);
});