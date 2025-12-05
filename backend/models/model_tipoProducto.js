const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Tipo_producto = sequelize.define(
  "Tipo_Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: "Tipo_Producto",
    timestamps: false   
  }
);

module.exports = Tipo_producto;
