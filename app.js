const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const ejs = require('ejs');
const sequelize = require('./backend/models/index').sequelize;
const routerProductos = require('./backend/routers/routerProducto');
const routerTicket = require('./backend/routers/routerTicket');
const path = require('node:path');


const ruta = path.resolve(__dirname, "tp/Frontend");//path.resolve(process.env.RUTA_CONTENTIDO_ESTATICO);

const rutaVistas = path.join(__dirname, 'backend/vistas');

app.set("views", rutaVistas);
app.set('view engine', 'ejs');

app.use(express.static(ruta));

app.use('/productos', routerProductos);

app.use('/ticket', routerTicket);

sequelize
  .sync()
  .then(() => {
    console.log("Conectando a la data base");
  })
  .then(() => {
    app.listen(port, () => console.log(`App escuchando en puerto ${port}`));
    })
  .catch((error) => console.log({ error }));


//app.listen(port, () => console.log(`App escuchando en puerto ${port}`));