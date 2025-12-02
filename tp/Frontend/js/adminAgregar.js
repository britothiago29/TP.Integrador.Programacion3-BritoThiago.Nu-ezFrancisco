// ========================================
// PROTECCIÓN DEL PANEL ADMIN
// ========================================
if (localStorage.getItem("adminLogueado") !== "true") {
    window.location.href = "admin.html";
}

// Cargar productos actuales
let productosAdmin = JSON.parse(localStorage.getItem("productosAdmin")) || [];


// ========================================
// PREVIEW DE IMAGEN
// ========================================
const inputImagen = document.getElementById("imagen");
const preview = document.getElementById("preview");

inputImagen.addEventListener("input", () => {
    const url = inputImagen.value.trim();

    if (url.length > 5) {
        preview.src = url;
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
    }
});


// ========================================
// GUARDAR PRODUCTO
// ========================================
document.getElementById("formAgregar").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value.trim());
    const tipo = document.getElementById("tipo").value;
    const imagen = inputImagen.value.trim();
    const activo = document.getElementById("activo").checked;

    if (!nombre || !precio || !tipo || !imagen) {
        alert("Debe completar todos los campos.");
        return;
    }

    const nuevo = {
        id: productosAdmin.length ? productosAdmin[productosAdmin.length - 1].id + 1 : 1,
        nombre,
        precio,
        tipo,
        imagen,
        activo
    };

    productosAdmin.push(nuevo);

    // Guardar en localStorage
    localStorage.setItem("productosAdmin", JSON.stringify(productosAdmin));

    alert("Producto agregado correctamente ✔");

    window.location.href = "adminDashboard.html";
});
