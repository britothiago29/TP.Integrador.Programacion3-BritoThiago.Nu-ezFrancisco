const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

function mostrarSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[n].classList.add("active");
    dots[n].classList.add("active");
}

function siguiente() {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
}

function anterior() {
    index = (index - 1 + slides.length) % slides.length;
    mostrarSlide(index);
}

next.addEventListener("click", siguiente);
prev.addEventListener("click", anterior);

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        mostrarSlide(index);
    });
});

// Cambio automático cada 5 segundos
setInterval(siguiente, 5000);
