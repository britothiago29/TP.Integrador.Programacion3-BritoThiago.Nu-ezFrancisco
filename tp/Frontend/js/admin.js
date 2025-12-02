// ==========================================
// LOGIN DEL ADMINISTRADOR — FRONT-END
// ==========================================

const emailInput = document.getElementById("adminEmail");
const passInput = document.getElementById("adminPassword");
const btnLogin = document.getElementById("btnLogin");
const btnAccesoRapido = document.getElementById("btnAccesoRapido");

// ===============================
// Acceso rápido (obligatorio TP)
// ===============================
btnAccesoRapido.addEventListener("click", () => {
    emailInput.value = "admin@frap.com";
    passInput.value = "admin123";
});

// ===============================
// Validación FRONT
// ===============================
btnLogin.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const pass = passInput.value.trim();

    if (email === "" || pass === "") {
        alert("Completar todos los campos.");
        return;
    }

    // POR AHORA ES LOGIN FICTICIO
    // Cuando hagamos backend → reemplazamos este bloque por fetch()
    if (email === "admin@frap.com" && pass === "admin123") {
        // guardamos sesión temporal
        localStorage.setItem("adminLogueado", "true");
        window.location.href = "adminDashboard.html";
    } else {
        alert("Credenciales incorrectas.");
    }
});
