const productos = [
    { id: 1, tipo: "zapatillas", nombre: "Nike Air Zoom", precio: 58000, imagen: "../assets/img/nike.png" },
    { id: 2, tipo: "zapatillas", nombre: "Adidas Superstar", precio: 54000, imagen: "../assets/img/adidas.png" },
    { id: 3, tipo: "ropa", nombre: "Remera Oversize", precio: 18000, imagen: "../assets/img/remera.png" },
    { id: 4, tipo: "ropa", nombre: "Buzo Hoodie", precio: 32000, imagen: "../assets/img/buzo.png" }
];

const contenedor = document.getElementById("listaProductos");
const botonesCat = document.querySelectorAll(".cat-btn");

function mostrarProductos(tipo) {
    contenedor.innerHTML = "";
    const filtrados = productos.filter(p => p.tipo === tipo);

    filtrados.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(card);
    });
}

botonesCat.forEach(btn => {
    btn.addEventListener("click", () => {
        botonesCat.forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        mostrarProductos(btn.dataset.cat);
    });
});

mostrarProductos("zapatillas"); // al iniciar

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const prod = productos.find(p => p.id === id);
    const existe = carrito.find(i => i.id === id);

    if(existe) existe.cantidad++;
    else carrito.push({ ...prod, cantidad: 1 });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado 🛒");
}
