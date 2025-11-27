const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_proyecto', 'root', '', 
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion a la base de datos establecida correctamente");
    } catch (error) {
        console.log("Error al conectar a la base de datos: ", error);
    }
}

testConnection();

module.exports = sequelize;