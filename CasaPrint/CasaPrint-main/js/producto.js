const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Sin id en la URL: volver al catálogo
if (!id) {
  window.location.href = 'catalogo.html';
}

const producto = productos.find(function (p) {
  return p.id === id;
});
const contenedor = document.getElementById('producto');
const gridSimilares = document.getElementById('similares-grid');

// Devuelve la marca de un producto a partir de sus características
function marcaDe(p) {
  const fila = p.caracteristicas.find(function (c) {
    return c[0] === 'Marca';
  });
  return fila ? fila[1] : '';
}

if (!producto) {
  contenedor.innerHTML = '<p>Producto no encontrado. <a href="catalogo.html">Volver al catálogo</a></p>';
  document.querySelector('.similares').hidden = true;
} else {
  document.title = producto.nombre + ' | CasaPrint';

  // ----- Información del producto -----
  let filas = '';
  producto.caracteristicas.forEach(function (c) {
    filas += '<tr><th scope="row">' + c[0] + '</th><td>' + c[1] + '</td></tr>';
  });

  contenedor.innerHTML =
    '<img src="' + producto.imagen + '" alt="' + producto.nombre + '" class="producto__img">' +
    '<div class="producto__info">' +
      '<h1 class="producto__nombre">' + producto.nombre + '</h1>' +
      '<p class="producto__precio">' + formatoPrecio(producto.precio) + '</p>' +
      '<p class="producto__descripcion">' + producto.descripcion + '</p>' +
      '<h2 class="producto__subtitulo">Características</h2>' +
      '<table class="producto__tabla">' + filas + '</table>' +
      '<div class="producto__acciones">' +
        '<label for="cantidad">Cantidad</label>' +
        '<input type="number" id="cantidad" value="1" min="1" max="99">' +
        '<button type="button" class="btn btn-anadir" data-id="' + producto.id + '">Añadir al carrito</button>' +
        '<a href="catalogo.html" class="btn">Volver al catálogo</a>' +
      '</div>' +
    '</div>';

  // ----- Productos similares -----
  // Primero los de la misma marca, y después los de precio más parecido
  const marcaActual = marcaDe(producto);

  const similares = productos
    .filter(function (p) {
      return p.id !== producto.id;
    })
    .sort(function (a, b) {
      const mismaA = marcaDe(a) === marcaActual ? 0 : 1;
      const mismaB = marcaDe(b) === marcaActual ? 0 : 1;
      if (mismaA !== mismaB) {
        return mismaA - mismaB;
      }
      return Math.abs(a.precio - producto.precio) - Math.abs(b.precio - producto.precio);
    })
    .slice(0, 3);

  let html = '';
  similares.forEach(function (p) {
    html +=
      '<a href="producto.html?id=' + p.id + '" class="similar-card">' +
        '<img src="' + p.imagen + '" alt="' + p.nombre + '" class="similar-card__img">' +
        '<p class="similar-card__name">' + p.nombre + '</p>' +
        '<p class="similar-card__price">' + formatoPrecio(p.precio) + '</p>' +
      '</a>';
  });
  gridSimilares.innerHTML = html;
}