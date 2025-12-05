const { realizarVenta, descargarTicket } = require('../controllers/ticket_controller');
const { validarBodyVenta } = require('../middlewares/middlewares_ventas');
const express = require('express');
const router = express.Router();

router.post('/confirmarventa', validarBodyVenta(), realizarVenta);

router.post('/descargar_ticket', descargarTicket);

module.exports = router;