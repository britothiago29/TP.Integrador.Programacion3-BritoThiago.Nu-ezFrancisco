const btnModo = document.getElementById("modoToggle");
const body = document.body;

if (localStorage.getItem("modo") === "dark") {
    body.classList.add("dark");
    btnModo.textContent = "Modo claro";
}

btnModo.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        btnModo.textContent = "Modo claro";
        localStorage.setItem("modo", "dark");
    } else {
        btnModo.textContent = "Modo oscuro";
        localStorage.setItem("modo", "light");
    }
});
