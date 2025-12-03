const ejs = require('ejs');
const path = require('path');



ejs.renderFile(
  path.join(__dirname, 'TicketVista.ejs'),
  {
    nombre_cliente:"Juan Perez",
    fecha_compra: new Date(),
    productos:[
        {descripcion:"Jordan 1 low", cantidad:2,subtotal:400000},
        {descripcion:"Adidas Campus", cantidad:4,subtotal:700000},
        {descripcion:"Dunk low", cantidad:1,subtotal:200000},
    ],
    total:1300000
  },
  { datos: 'test' },
  (err, html) => {
    if (err) throw err;
    console.log(html);
  }
);

const btnVolver = getElementById("volverBtn");
const descargarTicket = getElementById("descargarTicket");

btnVolver.addEventListener("click", () => {
    window.location.href = "/"; 
});

descargarTicket.addEventListener("click", () => {
    generarTicket(); 
});