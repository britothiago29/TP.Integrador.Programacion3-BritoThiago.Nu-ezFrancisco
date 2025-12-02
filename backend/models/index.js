const sequelize = require("../db/database");
const Producto = require("./model_producto");
const Tipo_producto = require("./model_tipoProducto");
const Ticket = require("./model_ventas");
const Detalle_venta = require("./model_detalleVenta");
const Credenciales_admins = require("./model_credencialesAdmins");

// Definicion de relaciones

Tipo_producto.hasMany(Producto, {
    foreignKey: "id_tipo_producto"
});

Producto.belongsTo(Tipo_producto, {
    foreignKey: "id_tipo_producto"
});


Credenciales_admins.hasMany(Producto, {
    foreignKey: "id_admin"
});

Producto.belongsTo(Credenciales_admins, {
    foreignKey: "id_admin"
});

Ticket.hasMany(Detalle_venta, {
    foreignKey: "id_ticket"
});

Detalle_venta.belongsTo(Ticket, {
    foreignKey: "id_ticket"
});

Producto.hasMany(Detalle_venta, {
    foreignKey: "id_producto"
});

Detalle_venta.belongsTo(Producto, {
    foreignKey: "id_producto"
});

module.exports = {
    sequelize, 
    Producto,
    Tipo_producto,
    Ticket,
    Detalle_venta,
    Credenciales_admins
};