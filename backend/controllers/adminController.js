const bcrypt = require("bcryptjs");
const sequelize = require('../models/index').sequelize;

// MODELOS REALES
const Producto = require("../models/model_producto");
const TipoProducto = require("../models/model_tipoProducto");
const Admin = require("../models/model_credencialesAdmins");

module.exports = {

    // ======================================================
    // LOGIN GET
    // ======================================================
    login: (req, res) => {
        return res.render("admin/login");
    },

    // ======================================================
    // LOGIN POST
    // ======================================================
    processLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const admin = await Admin.findOne({ where: { email } });

            if (!admin) {
                return res.render("admin/login", { error: "Usuario no encontrado" });
            }

            const passwordCorrecta = bcrypt.compareSync(password, admin.contraseña);

            if (!passwordCorrecta) {
                return res.render("admin/login", { error: "Contraseña incorrecta" });
            }

            // guardamos sesión
            req.session.admin = {
                id_admin: admin.id_admin,
                email: admin.email
            };

            return res.redirect("/panel");

        } catch (error) {
            console.log("Error en login:", error);
            return res.status(500).send("Error interno");
        }
    },

    // ======================================================
    // DASHBOARD – LISTADO DE PRODUCTOS
    // ======================================================
    dashboard: async (req, res) => {
        try {
            const productos = await Producto.findAll({
                include: [{ 
                    model: TipoProducto, 
                    attributes: ["descripcion"] 
                }]
            });

            return res.render("admin/dashboard", { productos });

        } catch (error) {
            console.log("Error dashboard:", error);
            return res.status(500).send("Error al cargar dashboard");
        }
    },

    // ======================================================
    // FORMULARIO ALTA PRODUCTO
    // ======================================================
    createForm: async (req, res) => {
        const tipos = await TipoProducto.findAll();
        return res.render("admin/agregar", { tipos });
    },

    // ======================================================
    // CREAR PRODUCTO POST (sin multer)
    // ======================================================
    create: async (req, res) => {
        try {
            await Producto.create({
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                id_tipo_producto: req.body.id_tipo_producto,
                imagen: req.body.imagen,   // URL de imagen (sin multer)
                estado: true,
                id_admin: req.session.admin.id_admin,
                fecha_modificacion: new Date()
            });

            return res.redirect("/panel");

        } catch (error) {
            console.log("ERROR AL CREAR:", error);
            return res.status(500).send("Error al crear producto");
        }
    },

    // ======================================================
    // FORMULARIO EDITAR PRODUCTO
    // ======================================================
    editForm: async (req, res) => {
        try {
            const producto = await Producto.findByPk(req.params.id);
            const tipos = await TipoProducto.findAll();

            if (!producto) return res.send("Producto no encontrado");

            return res.render("admin/editar", { producto, tipos });

        } catch (error) {
            console.log("Error editForm:", error);
            return res.status(500).send("Error interno");
        }
    },

    // ======================================================
    // EDITAR PRODUCTO POST (sin multer)
    // ======================================================
    update: async (req, res) => {
        try {
            const producto = await Producto.findByPk(req.params.id);

            const nuevaImagen = req.body.imagen || producto.imagen;

            await Producto.update(
                {
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    id_tipo_producto: req.body.id_tipo_producto,
                    imagen: nuevaImagen,
                    estado: req.body.estado === "on",
                    fecha_modificacion: new Date()
                },
                { where: { id_producto: req.params.id } }
            );

            return res.redirect("/panel");

        } catch (error) {
            console.log("Error update:", error);
            return res.status(500).send("Error al editar producto");
        }
    },

    // ======================================================
    // DESACTIVAR PRODUCTO
    // ======================================================
    deactivate: async (req, res) => {
        await Producto.update(
            { estado: false },
            { where: { id_producto: req.params.id } }
        );

        return res.redirect("/panel");
    },

    // ======================================================
    // ACTIVAR PRODUCTO
    // ======================================================
    activate: async (req, res) => {
        await Producto.update(
            { estado: true },
            { where: { id_producto: req.params.id } }
        );

        return res.redirect("/panel");
    }
};
