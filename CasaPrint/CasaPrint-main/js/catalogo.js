const form = document.querySelector('.filters');
const cards = document.querySelectorAll('.product-card');
const sinResultados = document.getElementById('sin-resultados');
const borrar = document.querySelector('.filters__clear');

// Quita mayúsculas y tildes para comparar textos
function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Texto de búsqueda que viene del header (?q=...)
const parametros = new URLSearchParams(window.location.search);
const textoBuscado = normalizar((parametros.get('q') || '').trim());
const campoBuscador = document.querySelector('.navbar__search');

if (campoBuscador) {
  campoBuscador.value = parametros.get('q') || '';
}

// Devuelve los valores marcados de un grupo de checkboxes
function valoresMarcados(nombre) {
  const marcados = form.querySelectorAll('input[name="' + nombre + '"]:checked');
  return Array.from(marcados).map(function (input) {
    return input.value;
  });
}

function filtrar() {
  const tipos = valoresMarcados('tipo');
  const marcas = valoresMarcados('marca');
  const conectividades = valoresMarcados('conectividad');

  const min = parseFloat(form.elements['precio-min'].value) || 0;
  const max = parseFloat(form.elements['precio-max'].value) || Infinity;

  let visibles = 0;

  cards.forEach(function (card) {
    const tiposCard = card.dataset.tipo.split(' ');
    const marca = card.dataset.marca;
    const precio = parseFloat(card.dataset.precio);
    const conectividadCard = card.dataset.conectividad.split(' ');
    const nombre = normalizar(card.querySelector('.product-card__name').textContent);

    const cumpleTipo = tipos.length === 0 || tipos.some(function (t) {
      return tiposCard.includes(t);
    });

    const cumpleMarca = marcas.length === 0 || marcas.includes(marca);

    const cumplePrecio = precio >= min && precio <= max;

    const cumpleConectividad = conectividades.every(function (c) {
      return conectividadCard.includes(c);
    });

    // Búsqueda: todas las palabras deben aparecer en el nombre
    const cumpleBusqueda = textoBuscado === '' || textoBuscado.split(' ').every(function (palabra) {
      return nombre.includes(palabra);
    });

    const mostrar = cumpleTipo && cumpleMarca && cumplePrecio && cumpleConectividad && cumpleBusqueda;

    card.hidden = !mostrar;
    if (mostrar) {
      visibles++;
    }
  });

  sinResultados.hidden = visibles !== 0;
}

// Botón "Aplicar filtros": no recarga la página
form.addEventListener('submit', function (e) {
  e.preventDefault();
  filtrar();
});

// Filtra al instante al marcar una casilla o escribir un precio
form.addEventListener('input', filtrar);

// "Borrar filtros": también quita la búsqueda de la dirección
borrar.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'catalogo.html';
});

// Aplica la búsqueda al cargar la página
filtrar();

