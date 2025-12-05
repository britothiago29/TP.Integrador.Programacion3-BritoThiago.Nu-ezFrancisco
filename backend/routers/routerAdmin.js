// backend/routers/routerAdmin.js
console.log(">>> ROUTER ADMIN CARGADO OK:", __filename);

const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
    mostrarLogin,
    procesarLogin,
    loginRapido,
    crearUsuario,
    mostrarDashboard,
    mostrarFormularioAlta,
    crearProducto,
    mostrarFormularioEditar,
    actualizarProducto,
    desactivarProducto,
    activarProducto,
    logout
} = require('../controllers/adminController');

const isAdmin = require('../middlewares/isAdmin');

// LOGIN
router.get('/login', mostrarLogin);
router.post('/login', procesarLogin);

// Botón acceso rápido
router.get('/login/fast', loginRapido);

// Crear usuario admin con endpoint 
router.post('/crear-usuario', crearUsuario);

// Dashboard
router.get('/dashboard', isAdmin, mostrarDashboard);

// Definicion de ruta de imagenes
const uploadPath = path.join(__dirname, '../../tp/frontend/uploads'); 
const upload = multer({ dest: uploadPath });

// Alta
router.get('/productos/nuevo', isAdmin, mostrarFormularioAlta);
router.post('/productos/nuevo', upload.single("imagen"),isAdmin, crearProducto);

// Editar
router.get('/productos/:id/editar', isAdmin, mostrarFormularioEditar);
router.post('/productos/:id/editar', upload.single("imagen"), isAdmin, actualizarProducto);

// Baja lógica / activar
router.post('/productos/:id/desactivar', isAdmin, desactivarProducto);
router.post('/productos/:id/activar', isAdmin, activarProducto);

// Logout
router.post('/logout', isAdmin, logout);

module.exports = router;
