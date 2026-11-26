const formContacto = document.getElementById('form-contacto');
const mensajeOk = document.getElementById('form-ok');

formContacto.addEventListener('submit', function (e) {
  e.preventDefault();
  mensajeOk.hidden = false;
  formContacto.reset();
});