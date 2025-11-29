const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const routerProductos = require('./backend/routers/routerProducto');
const routerTicket = require('./backend/routers/routerTicket');

const path = require('node:path');

const ruta = path.resolve(__dirname, "public");//path.resolve(process.env.RUTA_CONTENTIDO_ESTATICO);

app.use(express.static(ruta));

app.get('/bienvenida', (req, res) => {
    res.sendFile(path.join(ruta, 'bienvenida.html'));
});// <---express.static(ruta) http://localhost:3000/public/rancor.jpg

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use('/productos', routerProductos);

app.use('/ticket', routerTicket);

app.listen(port, () => console.log(`App escuchando en puerto ${port}`));