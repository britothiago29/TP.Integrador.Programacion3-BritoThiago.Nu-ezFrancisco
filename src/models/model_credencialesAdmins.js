const { Sequelize } = require('../db/database');
const { DataTypes } = Sequelize;

const Credenciales_admins = Sequelize.define('Credenciales_admins', {
    id_admin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
        tableName: 'Credenciales_admins'
    }
);

module.exports = Credenciales_admins;