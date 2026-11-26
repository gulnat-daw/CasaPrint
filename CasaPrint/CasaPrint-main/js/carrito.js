function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch (e) {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function formatoPrecio(numero) {
  return numero.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

function anadirAlCarrito(id, cantidad) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(function (item) {
    return item.id === id;
  });

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id: id, cantidad: cantidad });
  }
  guardarCarrito(carrito);
}

function cambiarCantidad(id, cantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find(function (i) {
    return i.id === id;
  });
  if (item && cantidad > 0) {
    item.cantidad = cantidad;
    guardarCarrito(carrito);
  }
}

function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito().filter(function (item) {
    return item.id !== id;
  });
  guardarCarrito(carrito);
}

// Número de unidades junto al enlace "Carrito" del header
function actualizarContador() {
  const contador = document.getElementById('carrito-contador');
  if (!contador) {
    return;
  }
  const total = obtenerCarrito().reduce(function (suma, item) {
    return suma + item.cantidad;
  }, 0);
  contador.textContent = total;
}

// Cualquier botón con la clase "btn-anadir" y un data-id añade al carrito
document.addEventListener('click', function (e) {
  const boton = e.target.closest('.btn-anadir');
  if (!boton) {
    return;
  }

  // En la página del producto hay un campo de cantidad; en el catálogo no
  const campo = document.getElementById('cantidad');
  const cantidad = campo ? parseInt(campo.value, 10) || 1 : 1;

  anadirAlCarrito(boton.dataset.id, cantidad);

  const textoOriginal = boton.textContent;
  boton.textContent = 'Añadido ✓';
  setTimeout(function () {
    boton.textContent = textoOriginal;
  }, 1200);
});

actualizarContador();