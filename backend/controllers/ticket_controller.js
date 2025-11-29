const sequelize = require('../db/database.js');
const { DataTypes } = require('sequelize');

const Ticket = require('../models/model_ventas.js');
const Detalle_venta = require('../models/model_detalleVenta.js');
const Producto = require('../models/model_producto.js');

const realizarVenta = async (req, res) => {
    try {
        const body = req.body;
    
        let total = 0;

        const productosParseados = [];

            for (const prod of body.productos) {
                const productoDB = await Producto.findOne({ where: {id_producto: prod.id_producto}, attributes: ['id_producto', 'precio', 'descripcion'] });

                productoDB.cantidad = prod.cantidad;
                productosParseados.push(productoDB);
            }
            

        // crear el ticket
        for (const prod of productosParseados) {
            total += Number(prod.precio) * Number(prod.cantidad);
        }   
        
        const ticket = await Ticket.create({
            nombre_cliente: body.nombre_cliente,
            fecha: new Date(),
            sub_total: total
        });

        //crear los detalles de venta

        const id_ticket = ticket.id_ticket;

        for (const prod of productosParseados) {
            await Detalle_venta.create({
                id_ticket: id_ticket,
                id_producto: prod.id_producto,
                cantidad: prod.cantidad,
                precio_total: Number(prod.precio) * Number(prod.cantidad)
            });
        }

        return res.status(201).json({ message: 'Venta realizada con éxito'}); // Si el status de la response es 201, pasar a screen ticket

    } catch (error) {
        console.error('Error al realizar la venta:', error);
        res.status(500).json({ message: 'Error al realizar la venta' });
    }
};


module.exports = { realizarVenta };