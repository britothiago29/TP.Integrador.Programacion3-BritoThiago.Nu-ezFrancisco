let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const tbody = document.getElementById("carritoBody");
const totalCarrito = document.getElementById("totalCarrito");

function cargarCarrito() {
    tbody.innerHTML = "";
    let total = 0;

    carrito.forEach((prod, index) => {
        let subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        tbody.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td><img src="${prod.imagen}" class="carrito-img"></td>

                <td>
                    <button class="cant-btn" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span class="cantidad">${prod.cantidad}</span>
                    <button class="cant-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                </td>

                <td>$${subtotal}</td>

                <td>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})">X</button>
                </td>
            </tr>
        `;
    });

    totalCarrito.textContent = total;
}

function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito[index].cantidad = 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

cargarCarrito();
