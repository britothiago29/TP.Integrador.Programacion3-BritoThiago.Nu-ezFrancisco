const { Producto, Ticket, Detalle_venta } = require("../models/index");

const realizarVenta = async (req, res) => {
    try {
        const { nombre_cliente, productos } = req.body;

        let total = 0;
        let detalles = [];

        for (const prod of productos) {
            const p = await Producto.findOne({
                where: { id_producto: prod.id_producto }
            });

            const subtotal = p.precio * prod.cantidad;
            total += subtotal;

            detalles.push({
                id_producto: p.id_producto,
                nombre: p.descripcion,
                cantidad: prod.cantidad,
                precio: p.precio,
                subtotal
            });
        }

        const ticket = await Ticket.create({
            nombre_cliente,
            fecha: new Date(),
            sub_total: total
        });

        for (const d of detalles) {
            await Detalle_venta.create({
                id_ticket: ticket.id_ticket,
                id_producto: d.id_producto,
                cantidad: d.cantidad,
                precio_total: d.subtotal
            });
        }

        return res.status(201).json({
            id_ticket: ticket.id_ticket,
            nombre_cliente,
            total,
            detalles
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al confirmar venta" });
    }
};

const descargarTicket = async (req, res) => {
    try {
        const { id_ticket } = req.body;

        if (!id_ticket) {
            return res.status(400).json({ error: "Falta id_ticket" });
        }

        // Obtener el ticket
        const ticket = await Ticket.findOne({
            where: { id_ticket }
        });

        if (!ticket) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }

        // Obtener detalles del ticket
        const detallesDB = await Detalle_venta.findAll({
            where: { id_ticket },
            include: [
                { model: Producto, attributes: ["descripcion", "precio"] }
            ]
        });

        // Armar respuesta limpia
        const detalles = detallesDB.map(d => ({
            nombre: d.Producto.descripcion,
            cantidad: d.cantidad,
            precio: d.Producto.precio,
            subtotal: d.precio_total
        }));

        return res.json({
            id_ticket: ticket.id_ticket,
            nombre_cliente: ticket.nombre_cliente,
            total: ticket.sub_total,
            detalles
        });

    } catch (error) {
        console.error("Error al descargar ticket:", error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};

module.exports = { realizarVenta, descargarTicket };


