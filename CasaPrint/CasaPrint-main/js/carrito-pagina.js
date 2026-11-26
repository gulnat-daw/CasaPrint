const lista = document.getElementById('carrito-lista');
const unidadesEl = document.getElementById('resumen-unidades');
const totalEl = document.getElementById('resumen-total');
const btnFinalizar = document.getElementById('btn-finalizar');

function pintar() {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    lista.innerHTML = '<p>Tu carrito está vacío. <a href="catalogo.html">Ir al catálogo</a></p>';
    unidadesEl.textContent = '0';
    totalEl.textContent = formatoPrecio(0);
    btnFinalizar.disabled = true;
    return;
  }

  let total = 0;
  let unidades = 0;
  let html = '';

  carrito.forEach(function (item) {
    const p = productos.find(function (x) {
      return x.id === item.id;
    });
    if (!p) {
      return;
    }
    total += p.precio * item.cantidad;
    unidades += item.cantidad;

    html +=
      '<article class="carrito-card">' +
        '<a href="producto.html?id=' + p.id + '">' +
          '<img src="' + p.imagen + '" alt="' + p.nombre + '" class="carrito-card__img">' +
        '</a>' +
        '<h2 class="carrito-card__name">' +
          '<a href="producto.html?id=' + p.id + '">' + p.nombre + '</a>' +
        '</h2>' +
        '<div class="carrito-card__fila">' +
          '<p class="carrito-card__price">' + formatoPrecio(p.precio) + '</p>' +
          '<label class="carrito-card__cantidad">Cantidad ' +
            '<input type="number" class="carrito-card__input" data-id="' + p.id + '" value="' + item.cantidad + '" min="1" max="99">' +
          '</label>' +
        '</div>' +
        '<button type="button" class="carrito-card__eliminar" data-id="' + p.id + '">Eliminar</button>' +
      '</article>';
  });

  lista.innerHTML = html;
  unidadesEl.textContent = unidades;
  totalEl.textContent = formatoPrecio(total);
  btnFinalizar.disabled = false;
}

// Cambiar la cantidad
lista.addEventListener('change', function (e) {
  if (e.target.matches('.carrito-card__input')) {
    const cantidad = parseInt(e.target.value, 10);
    if (cantidad > 0) {
      cambiarCantidad(e.target.dataset.id, cantidad);
    }
    pintar();
  }
});

// Eliminar un producto
lista.addEventListener('click', function (e) {
  const boton = e.target.closest('.carrito-card__eliminar');
  if (boton) {
    eliminarDelCarrito(boton.dataset.id);
    pintar();
  }
});

// Finalizar compra (de momento solo un aviso)
btnFinalizar.addEventListener('click', function () {
  alert('Gracias por tu compra. Esta función todavía no está disponible.');
});

pintar();