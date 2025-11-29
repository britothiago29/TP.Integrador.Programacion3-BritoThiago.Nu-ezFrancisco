const { realizarVenta } = require('../controllers/ticket_controller');
const { validarBodyVenta, parseProductos } = require('../middlewares/middlewares_ventas');
const express = require('express');
const router = express.Router();

router.post('/confirmarventa', validarBodyVenta(), realizarVenta);

module.exports = router;