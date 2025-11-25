function $(id) {
    return document.getElementById(id);
}

logo = $("logo");

header = $("header");
mid_container = $("mid_container");
btn_modo = $("btn_modo");
main = $("main");
bienvenida = $("bienvenida");
input = $("input");
link = $("link");

input_nombre = $("input_nombre");
btn_continuar = $("btn_continuar");

function cambiarModo() {
    if (btn_modo.textContent.trim().toLowerCase() == "modooscuro") {
        // cambiar a claro
        btn_modo.innerText = "Modo\nclaro";

        // cambiar clases
        header.classList.remove("header_light");
        header.classList.add("header_dark");
        mid_container.classList.remove("mid_container_light");
        mid_container.classList.add("mid_container_dark");
        btn_modo.classList.remove("selector_light");
        btn_modo.classList.add("selector_dark");
        main.classList.remove("main_light");
        main.classList.add("main_dark");
        bienvenida.classList.remove("bienvenida_light");
        bienvenida.classList.add("bienvenida_dark");
        input.classList.remove("input_light");
        input.classList.add("input_dark");
        link.classList.remove("link_light");
        link.classList.add("link_dark");

        // cambiar logo
        logo.src = "/imagenes/logo_frap_foscuro.png";
    } else {
        // cambiar a oscuro
        btn_modo.innerText = "Modo\nOscuro";
        
        // cambiar clases
        header.classList.remove("header_dark");
        header.classList.add("header_light");
        mid_container.classList.remove("mid_container_dark");
        mid_container.classList.add("mid_container_light");
        btn_modo.classList.remove("selector_dark");
        btn_modo.classList.add("selector_light"); 
        main.classList.remove("main_dark");
        main.classList.add("main_light");
        bienvenida.classList.remove("bienvenida_dark");
        bienvenida.classList.add("bienvenida_light");
        input.classList.remove("input_dark");
        input.classList.add("input_light");
        link.classList.remove("link_dark");
        link.classList.add("link_light");

        logo.src = "/imagenes/logo_frap_fclaro.png";
    }
}

function continuar() {
    if (input_nombre.value.trim() != "") {
        // si hay un nombre ingresado
        localStorage.setItem("nombre_usuario", input_nombre.value);
        window.location.href = "https://www.google.com";
    } else {
        // si no se ingreso nada
        alert("Para continuar debe ingresar un nombre.");
    }
}

btn_continuar.addEventListener("click", continuar);
btn_modo.addEventListener("click", cambiarModo);