const Producto = require('../models/model_producto');

async function validarArrayProductos(productos) {
    for (const prod of productos) {
        const productoDB = await Producto.findOne({
            where: {
                id_producto: prod.id_producto,
                estado: true
            }
        });

        if (!productoDB) {
            return false;
        }
    }

    return true;
}   

function validarBodyVenta() {
    return async (req, res, next) => {
        try {
            const body = req.body;

            /*
            Tener en cuenta datos del array
            1. nombre del cliente
            2. array de productos
            */ 



            if (body.nombre_cliente === undefined || body.nombre_cliente.trim() === '') {
                return res.status(400).json({ message: 'El nombre del cliente es obligatorio' });
            } 
            
            if (body.productos === undefined || !Array.isArray(body.productos) || body.productos.length < 1) {
                return res.status(400).json({ message: 'El carrito se encuentra vacio' });
            }

            const productosValidos = await validarArrayProductos(body.productos);

            if(!productosValidos)   {
                return res.status(400).json({ message: 'Uno o más productos no son válidos' });
            }

            next();
        } catch (error) {
            console.error('Ocurrió un error validando la venta:', error);
            return res.status(500).json({ message: 'Ocurrió un error validando la venta' });
        }
    };
}
/*
function parseProductos() {
    return async (req, res, next) => {
        try {
            const body = req.body;
            const productosParseados = [];

            for (const prod of body.productos) {
                const productoDB = await Producto.findOne({ where: {id_producto: prod.id_producto}, attributes: ['id_producto', 'precio', 'descripcion'] });

                productoDB.cantidad = prod.cantidad;
                productosParseados.push(productoDB);
            }

            req.body.productos = productosParseados;
            
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Ocurrió un error' });
        }
    }
}*/

module.exports = { validarBodyVenta };