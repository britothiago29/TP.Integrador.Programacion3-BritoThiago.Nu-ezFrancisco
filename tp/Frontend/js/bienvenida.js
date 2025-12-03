function $(id) {
    return document.getElementById(id);
}

console.log("estoy aca")

let header = $("header");
let mid_container = $("mid_container");
let btn_modo = $("btn_modo");
let main = $("main");
let bienvenida = $("bienvenida");
let input = $("input");
let link = $("link");

let input_nombre = $("input_nombre");
let btn_continuar = $("btn_continuar");

// =======================
//   APLICAR MODO INICIAL
// =======================

// Si el usuario ya tenía modo oscuro guardado, lo aplicamos al cargar
window.addEventListener("DOMContentLoaded", () => {
    const modoGuardado = localStorage.getItem("modo"); // "dark" o "light"

    if (modoGuardado === "dark") {
        // Forzamos que el botón piense que está en modo "oscuro" para que cambie a claro
        btn_modo.innerText = "Modo\noscuro";
        cambiarModo();
    }
});

// =======================
//     CAMBIAR MODO 
// =======================

function cambiarModo() {

    let modoActual = btn_modo.innerText.replace(/\s+/g, "").toLowerCase(); // ej: "modooscuro"

    // Si el botón dice "Modo oscuro" → vamos a pasar a oscuro
    if (modoActual.includes("oscuro")) {
        // → Cambiar a MODO CLARO (fondo oscuro)
        btn_modo.innerText = "Modo\nclaro";

        header.classList.replace("header_light", "header_dark");
        mid_container.classList.replace("mid_container_light", "mid_container_dark");
        btn_modo.classList.replace("selector_light", "selector_dark");
        main.classList.replace("main_light", "main_dark");
        bienvenida.classList.replace("bienvenida_light", "bienvenida_dark");
        input.classList.replace("input_light", "input_dark");
        link.classList.replace("link_light", "link_dark");

        localStorage.setItem("modo", "dark");
    } else {
        // → Cambiar a MODO CLARO (fondo claro)
        btn_modo.innerText = "Modo\noscuro";

        header.classList.replace("header_dark", "header_light");
        mid_container.classList.replace("mid_container_dark", "mid_container_light");
        btn_modo.classList.replace("selector_dark", "selector_light");
        main.classList.replace("main_dark", "main_light");
        bienvenida.classList.replace("bienvenida_dark", "bienvenida_light");
        input.classList.replace("input_dark", "input_light");
        link.classList.replace("link_dark", "link_light");

        localStorage.setItem("modo", "light");
    }
}

// =======================
//     BOTÓN CONTINUAR
// =======================

function continuar() {

    let nombre = input_nombre.value.trim();

    if (nombre !== "") {

        // Guardamos el nombre para usarlo en ticket y otras pantallas
        localStorage.setItem("nombre_usuario", nombre);

        // 👉 El flujo del TP va a productos, NO a index
        window.location.href = "./productos.html";

    } else {
        alert("Para continuar debe ingresar un nombre.");
    }
}

btn_continuar.addEventListener("click", continuar);
btn_modo.addEventListener("click", cambiarModo);
