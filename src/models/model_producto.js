const { Sequelize } = require('../db/database');
const { DataTypes } = Sequelize;

const Producto = Sequelize.define('Producto', {
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
        allowNull: false,
        references: {
            model: 'Credenciales_admins',
            key: 'id'
        }
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});


module.exports = Producto;