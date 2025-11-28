const { Sequelize } = require('../db/database');
const { DataTypes } = Sequelize;

const Detalle_venta = Sequelize.define('Detalle_Venta', {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    id_ticket: {
        type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Venta',
                key: 'id_ticket'
            }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Producto',
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
        tableName: 'Detalle_Venta'
    });


module.exports = Detalle_venta;