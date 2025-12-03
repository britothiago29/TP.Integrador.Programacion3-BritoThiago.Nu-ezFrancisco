const sequelize = require('../models/index.js').sequelize;
const { DataTypes } = require('sequelize');

const Ticket = require('../models/index.js').Ticket;
const Detalle_venta = require('../models/index.js').Detalle_venta;
const Producto = require('../models/index.js').Producto;

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

        const objetoVista = {
            nombre_cliente:ticket.nombre_cliente,
            fecha_compra:ticket.fecha.getDate().toString().padStart(2, "0") + "/" + (ticket.fecha.getMonth() + 1).toString().padStart(2, "0") + "/" + ticket.fecha.getFullYear(),
            /*fecha_compra:ticket.fecha.toString().padStart(2, "0") + "/" + (fecha.getMonth() + 1).toString().padStart(2, "0") + "/" + fecha.getFullYear(),*/
            productos:[],
            total:ticket.sub_total
        };

        for (const prod of productosParseados) {
            let DetalleActual = await Detalle_venta.create({
                id_ticket: id_ticket,
                id_producto: prod.id_producto,
                cantidad: prod.cantidad,
                precio_total: Number(prod.precio) * Number(prod.cantidad)
            });

            let productoActual = await Producto.findOne( {where: {id_producto:DetalleActual.id_producto}, attributes: ['descripcion']} );

            let prodTicket = {descripcion: productoActual.descripcion, cantidad: DetalleActual.cantidad,subtotal:DetalleActual.precio_total};

            objetoVista.productos.push(prodTicket);
        }

        
        return res.status(200).render('TicketVista.ejs', {
            nombre_cliente:objetoVista.nombre_cliente,
            fecha_compra:objetoVista.fecha_compra,
            productos:objetoVista.productos,
            total:objetoVista.total
        })

    } catch (error) {
        console.error('Error al realizar la venta:', error);
        res.status(500).json({ message: 'Error al realizar la venta' });
    }
};

const descargarTicket = async (req, res) => {
    try{
        const { ticket } = req.body;
        
        const html = await ejs.renderFile('TicketVista.ejs', { ticket });

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(html);

        const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
        });

        await browser.close();

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="ticket.pdf"`,
            "Content-Length": pdfBuffer.length,
        });

        res.send(pdfBuffer);
    } catch (error) {
        console.error('error al descargar el ticket:', error);
        res.status(500).json({ message: 'Error al descargar el ticket' });
    }
};

module.exports = { realizarVenta, descargarTicket };