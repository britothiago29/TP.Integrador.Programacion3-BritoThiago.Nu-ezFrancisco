const { Sequelize } = require('../db/database');
const { DataTypes } = require('sequelize');

const Producto = require('../models/model_producto');

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


// Metodos para la api

const ObtenerTodosLosProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }   
};

const ObtenerProductoPorId = async (req, res) => {};

const ObtenerProductosPorCategoria = async (req, res) => {};

module.exports = { ObtenerTodosLosProductos };
