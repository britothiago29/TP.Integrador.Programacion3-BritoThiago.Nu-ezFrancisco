console.log("APP CORRIENDO DESDE:", __filename);

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const ejs = require('ejs');
const sequelize = require('./backend/models/index').sequelize;
const routerProductos = require('./backend/routers/routerProducto');
const routerTicket = require('./backend/routers/routerTicket');
const path = require('node:path');
const routerAdmin = require('./backend/routers/routerAdmin');
console.log("CARGANDO routerAdmin desde:", require.resolve('./backend/routers/routerAdmin'));


const session = require("express-session");

app.use(session({
    secret: "admin123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,      // obligatorio para localhost (sin https)
        httpOnly: false,    // permitimos que el navegador la lea (para debugging)
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 // 1 hora
    }
}));





const ruta = path.resolve(__dirname, "tp/Frontend");//path.resolve(process.env.RUTA_CONTENTIDO_ESTATICO);

const rutaVistas = path.join(__dirname, 'backend/vistas');

app.set("views", rutaVistas);
app.set('view engine', 'ejs');

app.use('/productos', routerProductos);

app.use('/ticket', routerTicket);

app.use('/panel', routerAdmin);

app.use('/public', express.static(ruta));


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