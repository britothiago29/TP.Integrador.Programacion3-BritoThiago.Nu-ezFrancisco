let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const ticketBody = document.getElementById("ticketBody");
const totalTicket = document.getElementById("totalTicket");
const nombreClienteInput = document.getElementById("nombreCliente");

function cargarTicket() {
    ticketBody.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
        let subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        ticketBody.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>${prod.cantidad}</td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });

    totalTicket.textContent = total;

    // Cargar nombre guardado
    nombreClienteInput.value = localStorage.getItem("nombreCliente") || "";
}

function guardarNombre() {
    localStorage.setItem("nombreCliente", nombreClienteInput.value);
    alert("Nombre guardado en ticket");
}

cargarTicket();
