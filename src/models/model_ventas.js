const { Sequelize } = require('../db/database');
const { DataTypes } = Sequelize;

const Venta = Sequelize.define('Venta', {
    id_ticket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Venta;