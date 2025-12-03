const sequelize = require('../db/database.js');
const { DataTypes } = require('sequelize');

const Producto = sequelize.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tipo_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tipo_Producto',
            key: 'id'
        }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Credenciales_admins',
            key: 'id_admin'
        }
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }},
    {
        tableName: 'productos',
        timestamps: false
    });


module.exports = Producto;