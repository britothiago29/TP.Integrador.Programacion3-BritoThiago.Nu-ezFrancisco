// =====================================================
// CONTROL DE ACCESO
// =====================================================
const nombreUsuario = localStorage.getItem("nombre_usuario");
if (!nombreUsuario) {
    window.location.href = "bienvenida.html";
}

// =====================================================
// PRODUCTOS — HARDCODEADOS POR AHORA
// =====================================================
// IMPORTANTE: Verificar que estas rutas EXISTEN realmente
const productos = [
    { id: 1, tipo: "zapatillas", nombre: "Nike Air Zoom", precio: 58000, imagen: "../assets/img/nike.png" },
    { id: 2, tipo: "zapatillas", nombre: "Adidas Superstar", precio: 54000, imagen: "../assets/img/adidas.png" },
    { id: 3, tipo: "ropa", nombre: "Remera Oversize Negra", precio: 18000, imagen: "../assets/img/remera.png" },
    { id: 4, tipo: "ropa", nombre: "Buzo Hoodie Gris", precio: 32000, imagen: "../assets/img/buzo.png" }
];


// =====================================================
// VARIABLES DOM
// =====================================================
const contenedor = document.getElementById("listaProductos");
const botonesCat = document.querySelectorAll(".cat-btn");
const paginacionDiv = document.getElementById("paginacion");

// FILTRO Y PAGINACIÓN
let filtroActual = "todos";
let paginaActual = 1;
const productosPorPagina = 4;

// =====================================================
// FILTRAR PRODUCTOS
// =====================================================
function obtenerFiltrados() {
    if (filtroActual === "todos") return productos;
    return productos.filter(p => p.tipo === filtroActual);
}

// =====================================================
// RENDER DE PRODUCTOS CON PAGINACIÓN
// =====================================================
function renderProductos() {
    const filtrados = obtenerFiltrados();
    const totalProductos = filtrados.length;
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    if (paginaActual > totalPaginas) paginaActual = totalPaginas;

    const inicio = (paginaActual - 1) * productosPorPagina;
    const pagina = filtrados.slice(inicio, inicio + productosPorPagina);

    contenedor.innerHTML = "";

    pagina.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio.toLocaleString("es-AR")}</p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        `;

        contenedor.appendChild(card);
    });

    renderPaginacion(totalPaginas);
}

// =====================================================
// BOTONES DE PAGINACIÓN
// =====================================================
function renderPaginacion(totalPaginas) {
    paginacionDiv.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;

        if (i === paginaActual) btn.classList.add("pagina-activa");

        btn.addEventListener("click", () => {
            paginaActual = i;
            renderProductos();
        });

        paginacionDiv.appendChild(btn);
    }
}

// =====================================================
// EVENTOS DE CATEGORÍAS
// =====================================================
botonesCat.forEach(btn => {
    btn.addEventListener("click", () => {
        botonesCat.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");

        filtroActual = btn.dataset.cat; // "zapatillas", "ropa" o "todos"
        paginaActual = 1;

        renderProductos();
    });
});

// =====================================================
// AGREGAR AL CARRITO (CORREGIDO Y SEGURO)
// =====================================================
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const prod = productos.find(p => p.id === id);

    if (!prod) {
        console.error("ERROR: Producto no encontrado:", id);
        return;
    }

    const existe = carrito.find(i => i.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            imagen: prod.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado 🛒");
}

window.agregarAlCarrito = agregarAlCarrito;

// =====================================================
// MOSTRAR TODOS MEZCLADOS AL COMENZAR
// =====================================================
filtroActual = "todos";
renderProductos();
