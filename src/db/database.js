const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_proyecto', 'root', '', 
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
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