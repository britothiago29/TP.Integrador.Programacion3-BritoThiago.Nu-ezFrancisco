const { Sequelize } = require('../models/index').sequelize;
const { DataTypes } = require('sequelize');

const Producto = require('../models/index').Producto;

const GetAllProductos = async (req, res) => {
    console.log("Entrando a GetAllProductos");
    try {
    const productos = await Producto.findAll();
    const productosLimpio = productos.map(producto => producto.dataValues);
    console.log("Productos obtenidos:");
    console.log(productosLimpio);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

GetAllProductos();

