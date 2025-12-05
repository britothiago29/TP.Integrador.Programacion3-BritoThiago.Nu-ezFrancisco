// backend/routers/routerAdmin.js
console.log(">>> ROUTER ADMIN CARGADO OK:", __filename);

const express = require('express');
const router = express.Router();

const {
    mostrarLogin,
    procesarLogin,
    loginRapido,
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

// Dashboard
router.get('/dashboard', isAdmin, mostrarDashboard);

// Alta
router.get('/productos/nuevo', isAdmin, mostrarFormularioAlta);
router.post('/productos/nuevo', isAdmin, crearProducto);

// Editar
router.get('/productos/:id/editar', isAdmin, mostrarFormularioEditar);
router.post('/productos/:id/editar', isAdmin, actualizarProducto);

// Baja lógica / activar
router.post('/productos/:id/desactivar', isAdmin, desactivarProducto);
router.post('/productos/:id/activar', isAdmin, activarProducto);

// Logout
router.post('/logout', isAdmin, logout);

module.exports = router;
