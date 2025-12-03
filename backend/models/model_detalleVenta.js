const sequelize = require('../db/database');
const { DataTypes } = require('sequelize');

const Detalle_venta = sequelize.define('Detalle_Venta', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    id_ticket: {
        type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ventas',
                key: 'id_ticket'
            }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id_producto'
        }
    }, 
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, 
    {
        tableName: 'Detalle_Venta',
        timestamps: false
    });


module.exports = Detalle_venta;