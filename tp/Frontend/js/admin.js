function loginAdmin() {
    const email = document.getElementById("adminEmail").value.trim();
    const pass = document.getElementById("adminPass").value.trim();

    if (email === "" || pass === "") {
        alert("Completa todos los campos");
        return;
    }

    // LOGIN SIMULADO — más adelante lo conectamos al backend
    if (email === "admin@frap.com" && pass === "1234") {
        localStorage.setItem("admin", "logueado");
        window.location.href = "adminDashboard.html";
    } else {
        alert("Credenciales incorrectas");
    }
}
