const sequelize = require('../db/database');
const { DataTypes } = require('sequelize');

const Credenciales_admins = sequelize.define('Credenciales_admins', {
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
    }},
    {
        tableName: 'Credenciales_admins',
        timestamps: false
    }
);

module.exports = Credenciales_admins;