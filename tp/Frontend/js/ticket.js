// =========================================
// CONTROL DE ACCESO
// =========================================
const nombreUsuario = localStorage.getItem("nombre_usuario");
if (!nombreUsuario) {
    window.location.href = "bienvenida.html";
}

const compraConfirmada = localStorage.getItem("compraConfirmada");
if (!compraConfirmada) {
    window.location.href = "carrito.html";
}

// =========================================
// VARIABLES
// =========================================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const ticketBody = document.getElementById("ticketBody");
const totalTicket = document.getElementById("totalTicket");
const spanNombre = document.getElementById("nombreTicket");
const spanFecha = document.getElementById("fechaTicket");
const volverBtn = document.getElementById("volverBtn");

// =========================================
// RENDER DEL TICKET
// =========================================
function cargarTicket() {
    ticketBody.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
        const precio = Number(prod.precio) || 0;
        const cantidad = Number(prod.cantidad) || 0;
        const subtotal = precio * cantidad;
        total += subtotal;

        ticketBody.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>${cantidad}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    totalTicket.textContent = total.toFixed(2);

    spanNombre.textContent = nombreUsuario;

    const hoy = new Date();
    spanFecha.textContent = hoy.toLocaleDateString("es-AR");
}

// =========================================
// BOTÓN "VOLVER AL INICIO"
// =========================================
volverBtn.addEventListener("click", () => {

    // limpiar datos del autoservicio
    localStorage.removeItem("carrito");
    localStorage.removeItem("compraConfirmada");

    window.location.href = "index.html";
});

// Render inicial
cargarTicket();
