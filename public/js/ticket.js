// =========================================
// VALIDACIÓN DE ACCESO
// =========================================
const nombreUsuario = localStorage.getItem("nombre_usuario");
const idTicket = localStorage.getItem("id_ticket");

if (!nombreUsuario) {
    window.location.href = "bienvenida.html";
}

if (!idTicket) {
    alert("No se encontró un ticket válido.");
    window.location.href = "index.html";
}

// =========================================
// VARIABLES
// =========================================
const ticketBody = document.getElementById("ticketBody");
const totalTicket = document.getElementById("totalTicket");
const spanNombre = document.getElementById("nombreTicket");
const spanFecha = document.getElementById("fechaTicket");
const volverBtn = document.getElementById("volverBtn");

// =========================================
// CARGAR TICKET DESDE BACKEND
// =========================================
async function cargarTicket() {
    try {
        const resp = await fetch("http://localhost:3000/ticket/descargar_ticket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_ticket: idTicket })
        });

        const data = await resp.json();
        console.log("Ticket recibido:", data);

        if (!resp.ok) {
            alert("Error obteniendo ticket");
            return;
        }

        // Llenar datos
        spanNombre.textContent = data.nombre_cliente;
        spanFecha.textContent = new Date().toLocaleString("es-AR");

        ticketBody.innerHTML = "";
        data.detalles.forEach(det => {
            ticketBody.innerHTML += `
                <tr>
                    <td>${det.nombre}</td>
                    <td>${det.cantidad}</td>
                    <td>$${det.subtotal}</td>
                </tr>
            `;
        });

        totalTicket.textContent = data.total;

    } catch (error) {
        console.error("Error cargando ticket:", error);
        alert("No se pudo cargar el ticket.");
    }
}

cargarTicket();

// =========================================
// BOTÓN VOLVER
// =========================================
volverBtn.addEventListener("click", () => {
    localStorage.removeItem("id_ticket");
    localStorage.removeItem("compraConfirmada");
    window.location.href = "index.html";
});