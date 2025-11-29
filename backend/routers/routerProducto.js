const { ObtenerProductos } = require('../controllers/producto_controller');
const express = require('express');
const router = express.Router();

router.get('/', ObtenerProductos);


module.exports = router;