const contenedorProductos = document.querySelector(".productos-grid");
const botonesCat = document.querySelectorAll(".cat-btn");
const paginacionDiv = document.getElementById("paginacion");

let productos = [];
let paginaActual = 1;
const productosPorPagina = 6;
let filtroActual = "todos";

// ==============================================
//  CARGAR PRODUCTOS DESDE EL BACKEND
// ==============================================
async function cargarProductos() {
    let url = "http://localhost:3000/productos/";

    if (filtroActual === "zapatillas") {
        url += "?categoria=1";
    }

    if (filtroActual === "ropa") {
        url += "?categoria=2";
    }

    try {
        const resp = await fetch(url);
        productos = await resp.json();
        paginaActual = 1; // Siempre reiniciar a página 1
        renderProductos();

    } catch (err) {
        console.log("Error cargando productos:", err);
    }
}

// ==============================================
//  RENDER PRODUCTOS (CON PAGINACIÓN)
// ==============================================
function renderProductos() {
    contenedorProductos.innerHTML = "";

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const pagina = productos.slice(inicio, fin);

    pagina.forEach(prod => {
        contenedorProductos.innerHTML += `
            <div class="card">
                <img src="${prod.imagen}" alt="${prod.descripcion}">
                <h3>${prod.descripcion}</h3>
                <p>$${prod.precio}</p>
                <button onclick="agregarCarrito(${prod.id_producto}, '${prod.descripcion}', ${prod.precio}, '${prod.imagen.trim()}')">
                    Agregar al carrito
                </button>
            </div>
        `;
    });

    renderPaginacion();
}

// ==============================================
//  PAGINACIÓN COMPLETA
// ==============================================
function renderPaginacion() {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    paginacionDiv.innerHTML = "";

    if (totalPaginas <= 1) return;

    let html = "";

    // Botón Anterior
    if (paginaActual > 1) {
        html += `<button class="pag-btn" onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`;
    }

    // Botones numéricos
    for (let i = 1; i <= totalPaginas; i++) {
        html += `
            <button class="pag-btn ${i === paginaActual ? 'activo' : ''}" onclick="cambiarPagina(${i})">
                ${i}
            </button>
        `;
    }

    // Botón Siguiente
    if (paginaActual < totalPaginas) {
        html += `<button class="pag-btn" onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`;
    }

    paginacionDiv.innerHTML = html;
}

function cambiarPagina(num) {
    paginaActual = num;
    renderProductos();
}

window.cambiarPagina = cambiarPagina;

// ==============================================
//  FILTRO DE CATEGORÍAS
// ==============================================
botonesCat.forEach(btn => {
    btn.addEventListener("click", () => {
        botonesCat.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        filtroActual = btn.dataset.cat;
        cargarProductos();
    });
});

// ==============================================
//  AGREGAR AL CARRITO
// ==============================================
function agregarCarrito(id, nombre, precio, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado");
}

window.agregarCarrito = agregarCarrito;

// ==============================================
//  CARGA INICIAL
// ==============================================
cargarProductos();
