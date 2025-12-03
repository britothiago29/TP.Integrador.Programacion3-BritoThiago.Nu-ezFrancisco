const contenedorProductos = document.querySelector(".productos-grid");
const botonesCat = document.querySelectorAll(".cat-btn");

let productos = [];
let paginaActual = 1;
const productosPorPagina = 6;
let filtroActual = "todos";

// ==============================================
//  CARGAR PRODUCTOS DESDE EL BACKEND
// ==============================================
async function cargarProductos() {
    let url = "http://localhost:3000/productos";

    if (filtroActual === "zapatillas") {
        url += "?categoria=1";
    }

    if (filtroActual === "ropa") {
        url += "?categoria=2";
    }

    try {
        const resp = await fetch(url);
        productos = await resp.json();
        renderProductos();

    } catch (err) {
        console.log("Error cargando productos:", err);
    }
}

// ==============================================
//  RENDER PRODUCTOS
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
}

// ==============================================
//  FILTRO DE CATEGORÍAS
// ==============================================
botonesCat.forEach(btn => {
    btn.addEventListener("click", () => {
        botonesCat.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        filtroActual = btn.dataset.cat;
        paginaActual = 1;

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
