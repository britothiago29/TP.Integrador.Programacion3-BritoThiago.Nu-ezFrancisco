const { ObtenerTodosLosProductos } = require('../controllers/producto_controller');
const express = require('express');
const router = express.Router();

router.get('/', ObtenerTodosLosProductos);

module.exports = router;