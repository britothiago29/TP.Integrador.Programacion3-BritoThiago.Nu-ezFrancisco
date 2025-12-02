// ====================================================
// CONTROL DE ACCESO DEL ADMIN
// ====================================================
if (localStorage.getItem("adminLogueado") !== "true") {
    window.location.href = "admin.html";
}

// ====================================================
// SIMULACIÓN DE PRODUCTOS (luego será API real)
// ====================================================

let productosAdmin = JSON.parse(localStorage.getItem("productosAdmin")) || [
    { id: 1, nombre: "Nike Air Zoom", precio: 58000, tipo: "zapatillas", imagen: "../assets/img/nike.png", activo: true },
    { id: 2, nombre: "Adidas Superstar", precio: 54000, tipo: "zapatillas", imagen: "../assets/img/adidas.png", activo: true },
    { id: 3, nombre: "Remera Oversize", precio: 18000, tipo: "ropa", imagen: "../assets/img/remera.png", activo: false },
    { id: 4, nombre: "Buzo Hoodie", precio: 32000, tipo: "ropa", imagen: "../assets/img/buzo.png", activo: true }
];

// Guardar si nunca había productos
localStorage.setItem("productosAdmin", JSON.stringify(productosAdmin));


// ====================================================
// RENDER TABLA DE PRODUCTOS
// ====================================================
const tabla = document.getElementById("tablaProductos");

function renderProductos() {
    tabla.innerHTML = "";

    productosAdmin.forEach((p) => {
        tabla.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td><img src="${p.imagen}" style="width:60px; border-radius:6px;"></td>
                <td>${p.nombre}</td>
                <td>$${p.precio}</td>
                <td>${p.tipo}</td>
                <td>${p.activo ? "🟢 Activo" : "🔴 Inactivo"}</td>

                <td>
                    <button onclick="editarProducto(${p.id})" 
                        style="padding:5px 10px; border:none; background:#2563eb; color:white; border-radius:6px; cursor:pointer;">
                        Editar
                    </button>
                    
                    <button onclick="toggleActivo(${p.id})"
                        style="padding:5px 10px; border:none; background:#6b7280; color:white; border-radius:6px; cursor:pointer;">
                        ${p.activo ? "Desactivar" : "Activar"}
                    </button>

                    <button onclick="eliminarProducto(${p.id})"
                        style="padding:5px 10px; border:none; background:red; color:white; border-radius:6px; cursor:pointer;">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

renderProductos();


// ====================================================
// ACCIONES DEL ADMINISTRADOR
// ====================================================

// Editar
function editarProducto(id) {
    localStorage.setItem("productoEditar", id);
    window.location.href = "adminEditar.html";
}

// Activar / desactivar
function toggleActivo(id) {
    const prod = productosAdmin.find(p => p.id === id);
    prod.activo = !prod.activo;

    localStorage.setItem("productosAdmin", JSON.stringify(productosAdmin));
    renderProductos();
}

// Eliminar
function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto?")) return;

    productosAdmin = productosAdmin.filter(p => p.id !== id);

    localStorage.setItem("productosAdmin", JSON.stringify(productosAdmin));
    renderProductos();
}
