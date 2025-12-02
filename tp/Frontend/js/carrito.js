// ===============================
//  CONTROL DE ACCESO
// ===============================
const nombreUsuario = localStorage.getItem("nombre_usuario");
if (!nombreUsuario) {
    // Si no hay nombre cargado desde bienvenida, lo mando de vuelta
    window.location.href = "bienvenida.html";
}

// ===============================
//  VARIABLES GLOBALES
// ===============================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const tbody = document.getElementById("carritoBody");
const totalCarrito = document.getElementById("totalCarrito");
const btnFinalizar = document.getElementById("btnFinalizar");

// ===============================
//  RENDER DEL CARRITO
// ===============================
function cargarCarrito() {
    tbody.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center">
                    No hay productos en el carrito.
                </td>
            </tr>
        `;
        totalCarrito.textContent = "0.00";
        return;
    }

    carrito.forEach((prod, index) => {
        const precio = Number(prod.precio) || 0;
        const cantidad = Number(prod.cantidad) || 0;
        const subtotal = precio * cantidad;
        total += subtotal;

        tbody.innerHTML += `
            <tr>
                <td>${prod.nombre ?? "Sin nombre"}</td>

                <td>
                    <img src="${prod.imagen ?? ""}" class="carrito-img" alt="${prod.nombre ?? ""}">
                </td>

                <td>
                    <button class="cant-btn" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span class="cantidad">${cantidad}</span>
                    <button class="cant-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                </td>

                <td>$${subtotal.toFixed(2)}</td>

                <td>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})">X</button>
                </td>
            </tr>
        `;
    });

    totalCarrito.textContent = total.toFixed(2);
}

// ===============================
//  CAMBIAR CANTIDAD
// ===============================
function cambiarCantidad(index, cambio) {
    const item = carrito[index];
    if (!item) return;

    const actual = Number(item.cantidad) || 0;
    let nueva = actual + cambio;

    if (nueva < 1) nueva = 1;

    item.cantidad = nueva;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// ===============================
//  ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

// ===============================
//  FINALIZAR COMPRA
// ===============================
btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito.");
        return;
    }

    const confirmar = window.confirm("¿Desea confirmar la compra?");

    if (confirmar) {
        // Marcamos que la compra se confirmó
        localStorage.setItem("compraConfirmada", "true");
        // (más adelante acá haremos fetch al backend para registrar la venta)
        window.location.href = "ticket.html";
    }
});

// Hacer funciones visibles para los onclick del HTML
window.cambiarCantidad = cambiarCantidad;
window.eliminarProducto = eliminarProducto;

// Render inicial
cargarCarrito();
