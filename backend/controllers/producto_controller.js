const { Sequelize } = require('../models/index.js').sequelize;
const { DataTypes } = require('sequelize');

const Producto = require('../models/index.js').Producto;


const ObtenerProductos = async (req, res) => { // Filtro para obtener productos desde el front
    try {
            const { categoria } = req.query;
            // categoria = 1 -> Calzado
            // categoria = 2 -> Indumentaria

            const where = {}; // Objeto de condiciones para la consulta

            if (categoria) { // Si hay una categoria en la query, filtra por categoria
                where.id_tipo_producto = categoria;
            }

            where.estado = true; // Solo obtiene productos que se encuentren activos

            const productos = await Producto.findAll({ 
                where, 
                attributes: ['id_producto', 'precio', 'descripcion', 'imagen'] // Solo trae atributos necesarios en el front
            });
            res.json(productos);

        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).json({ message: "Error al obtener productos" });
        } 
};

const crearProducto = async (req, res) => { // Por el momento de prueba.
    try {
        await Producto.create({
            id_producto:1,
            id_tipo_producto: 1,
            precio: 1000.00,
            descripcion: "Producto de Prueba",
            imagen: "/imagen.jpg",
            estado: true,
            id_admin: 1,
            fecha_modificacion: new Date()
        })
    } catch (error) {
        console.error("Error al crear producto:", error);
    }
};


module.exports = { ObtenerProductos };