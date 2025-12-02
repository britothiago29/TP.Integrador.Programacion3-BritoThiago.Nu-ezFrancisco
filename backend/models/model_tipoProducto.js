const sequelize = require('../db/database.js');
const { DataTypes } = require('sequelize');

const Tipo_producto = sequelize.define('Tipo_Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }, 
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: 'Tipo_Producto'
});

module.exports = Tipo_producto;