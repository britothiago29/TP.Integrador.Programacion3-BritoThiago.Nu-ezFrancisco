// ========================================
// PROTECCIÓN DEL ADMIN
// ========================================
if (localStorage.getItem("adminLogueado") !== "true") {
    window.location.href = "admin.html";
}

// ========================================
// OBTENER ID DEL PRODUCTO A EDITAR
// ========================================
const idEditar = Number(localStorage.getItem("productoEditar"));

if (!idEditar) {
    alert("No se seleccionó ningún producto.");
    window.location.href = "adminDashboard.html";
}

let productosAdmin = JSON.parse(localStorage.getItem("productosAdmin")) || [];

const producto = productosAdmin.find(p => p.id === idEditar);

if (!producto) {
    alert("Producto no encontrado.");
    window.location.href = "adminDashboard.html";
}

// ========================================
// ELEMENTOS DEL FORM
// ========================================
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const selectTipo = document.getElementById("tipo");
const inputImagen = document.getElementById("imagen");
const checkActivo = document.getElementById("activo");
const preview = document.getElementById("preview");

// ========================================
// CARGAR PRODUCTO EN EL FORM
// ========================================
inputNombre.value = producto.nombre;
inputPrecio.value = producto.precio;
selectTipo.value = producto.tipo;
inputImagen.value = producto.imagen;
checkActivo.checked = producto.activo;

preview.src = producto.imagen;
preview.style.display = "block";


// ========================================
// PREVIEW AUTOMÁTICO DE IMAGEN
// ========================================
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
// GUARDAR CAMBIOS
// ========================================
document.getElementById("formEditar").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const precio = Number(inputPrecio.value.trim());
    const tipo = selectTipo.value;
    const imagen = inputImagen.value.trim();
    const activo = checkActivo.checked;

    if (!nombre || !precio || !tipo || !imagen) {
        alert("Complete todos los campos.");
        return;
    }

    producto.nombre = nombre;
    producto.precio = precio;
    producto.tipo = tipo;
    producto.imagen = imagen;
    producto.activo = activo;

    localStorage.setItem("productosAdmin", JSON.stringify(productosAdmin));

    alert("Cambios guardados correctamente ✔");

    window.location.href = "adminDashboard.html";
});
