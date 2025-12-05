const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const ejs = require('ejs');
const sequelize = require('./backend/models/index').sequelize;
const path = require('node:path');

// Routers
const routerProductos = require('./backend/routers/routerProducto');
const routerTicket = require('./backend/routers/routerTicket');
const routerAdmin = require('./backend/routers/routerAdmin');

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

// Ruta de contenido estatico
const ruta = path.resolve(__dirname, "public"); //path.resolve(process.env.RUTA_CONTENTIDO_ESTATICO);

// Ruta vistas ejs
const rutaVistas = path.join(__dirname, 'backend/vistas');
app.set("views", rutaVistas);
app.set('view engine', 'ejs');


// Routers
app.use('/productos', routerProductos);

app.use('/ticket', routerTicket);

app.use('/admin', routerAdmin);

app.use('/', express.static(ruta));



// Conexion DB y servidor
sequelize
  .sync()
  .then(() => {
    console.log("Conectando a la data base");
  })
  .then(() => {
    app.listen(port, () => console.log(`App escuchando en puerto ${port}`));
    })
  .catch((error) => console.log({ error }));
