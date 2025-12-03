const btnModo = document.getElementById("modoToggle");
const body = document.body;
const logo = document.getElementById("logoFrap");

// FUNCIÓN PARA CAMBIAR LOGO SEGÚN EL TEMA
function actualizarLogo() {
    if (!logo) return;

    if (body.classList.contains("dark")) {
        // logo modo oscuro
        logo.src = "./assets/imagenes/logo_frap_foscuro.png";
    } else {
        // logo modo claro
        logo.src = "./assets/imagenes/logo_frap_fclaro.png";
    }
}

// ===============================
// ESTADO INICIAL
// ===============================
if (localStorage.getItem("modo") === "dark") {
    body.classList.add("dark");
    btnModo.textContent = "Modo claro";
} else {
    btnModo.textContent = "Modo oscuro";
}

// actualizar logo al cargar
actualizarLogo();

// ===============================
// BOTÓN PARA CAMBIAR MODO
// ===============================
btnModo.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        btnModo.textContent = "Modo claro";
        localStorage.setItem("modo", "dark");
    } else {
        btnModo.textContent = "Modo oscuro";
        localStorage.setItem("modo", "light");
    }

    actualizarLogo();
});
