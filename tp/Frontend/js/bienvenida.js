// === ACCESOS RÁPIDOS ===
function $(id) {
    return document.getElementById(id);
}

let logo = $("logo");
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
//     CAMBIAR MODO 
// =======================

function cambiarModo() {

    // Detectamos si el botón está en modo oscuro
    let modoActual = btn_modo.innerText.replace(/\s+/g, "").toLowerCase(); // ej: "ModeOscuro"

    if (modoActual === "modoopcuro" || modoActual === "modooscuro") {

        // → Cambiar a MODO CLARO
        btn_modo.innerText = "Modo\nclaro";

        header.classList.replace("header_light", "header_dark");
        mid_container.classList.replace("mid_container_light", "mid_container_dark");
        btn_modo.classList.replace("selector_light", "selector_dark");
        main.classList.replace("main_light", "main_dark");
        bienvenida.classList.replace("bienvenida_light", "bienvenida_dark");
        input.classList.replace("input_light", "input_dark");
        link.classList.replace("link_light", "link_dark");

        // Cambiar logo
        logo.src = "../assets/imagenes/logo_frap_foscuro.png";

    } else {
        // → Cambiar a MODO OSCURO
        btn_modo.innerText = "Modo\noscuro";

        header.classList.replace("header_dark", "header_light");
        mid_container.classList.replace("mid_container_dark", "mid_container_light");
        btn_modo.classList.replace("selector_dark", "selector_light");
        main.classList.replace("main_dark", "main_light");
        bienvenida.classList.replace("bienvenida_dark", "bienvenida_light");
        input.classList.replace("input_dark", "input_light");
        link.classList.replace("link_dark", "link_light");

        // Cambiar logo
        logo.src = "../assets/imagenes/logo_frap_fclaro.png";
    }
}



// =======================
//     BOTÓN CONTINUAR
// =======================

function continuar() {

    let nombre = input_nombre.value.trim();

    if (nombre !== "") {

        localStorage.setItem("nombre_usuario", nombre);

        // Cambia esta URL cuando tengas la pantalla principal
        // window.location.href = "../html/index.html";
        window.location.href = "../html/index.html";

    } else {
        alert("Para continuar debe ingresar un nombre.");
    }
}

btn_continuar.addEventListener("click", continuar);
btn_modo.addEventListener("click", cambiarModo);
