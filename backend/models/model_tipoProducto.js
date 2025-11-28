import { Sequelize } from '../db/database.js';
import { DataTypes } from 'sequelize';

const Tipo_producto = Sequelize.define('Tipo_Producto', {
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