// backend/controllers/adminController.js

const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { Producto, Tipo_producto, Credenciales_admins } = require("../models/index");

// GET /admin/login
const mostrarLogin = (req, res) => {
    if (req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    res.render('login', { error: null });
};

// POST /admin/login
const procesarLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Credenciales_admins.findOne({ where: { email } });

        if (!admin) {
            return res.render('login', { error: "Credenciales inválidas" });
        }

        const hashedPass = await bcrypt.hash(password, 15);

        // 🔹 Si ya guardás la contraseña encriptada en la BD:
        const ok = await bcrypt.compare(password, admin.contraseña);
        console.log("Email ingresado:", email);
        console.log("Contraseña Ingresada:", password);
        console.log("Contraseña ingresada hasheada:", hashedPass);
        console.log("Admin encontrado en BD:", admin ? admin.email : "null");
        console.log("Contraseña en BD:", admin ? admin.contraseña : "null");

        

        // 🔹 Si todavía la tenés en texto plano, podés usar:
        // const ok = (password === admin.contraseña);

        if (!ok) {
            return res.render('login', { error: "Credenciales inválidas" });
        }

        // Guardamos datos mínimos en session
        req.session.admin = {
            id: admin.id_admin,
            email: admin.email
        };

        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error("Error en login admin:", error);
        return res.render('login', { error: "Error del servidor" });
    }
};

// GET /admin/login/fast → botón acceso rápido
const loginRapido = async (req, res) => {
    try {
        // Tomamos el PRIMER admin de la tabla como acceso rápido
        const admin = await Credenciales_admins.findOne();

        if (!admin) {
            return res.send("No hay admins cargados en la BD.");
        }

        req.session.admin = {
            id: admin.id_admin,
            email: admin.email
        };

        return res.redirect('/admin/dashboard');
    } catch (error) {
        console.error("Error en login rápido:", error);
        return res.send("Error en login rápido");
    }
};

// GET /admin/dashboard
const mostrarDashboard = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Tipo_producto,
                attributes: ["descripcion"]
            }],
            order: [['id_producto', 'ASC']]
        });

        const productosFront = productos.map(p => ({
            id_producto: p.id_producto,
            descripcion: p.descripcion,
            precio: p.precio,
            imagen: p.imagen,
            estado: p.estado,
            tipo: p.Tipo_producto ? p.Tipo_producto.descripcion : "",
            id_tipo_producto: p.id_tipo_producto
        }));

        res.render('dashboard', {
            admin: req.session.admin,
            productos: productosFront
        });

    } catch (error) {
        console.error("Error al mostrar dashboard:", error);
        return res.send("Error al mostrar dashboard");
    }
};

// GET /admin/productos/nuevo
const mostrarFormularioAlta = async (req, res) => {
    const tipos = await Tipo_producto.findAll();
    res.render('editar', {
        admin: req.session.admin,
        producto: null,
        tipos,
        accion: 'alta'
    });
};


// POST /admin/crear-usuario
const crearUsuario = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const saltRounds = 15;

        if (email && pass) {
            const hashedPass = await bcrypt.hash(pass, saltRounds);
            console.log("------------- guia --------------")
            console.log(hashedPass);
            const nuevoUsuario = await Credenciales_admins.create({email:email, contraseña:hashedPass});
            res.send(nuevoUsuario);
        }

    } catch (error) {
        console.error("Ocurrió un error creando el usuario:", error);
        return res.send("Error creando el usuario");
    }
}

const guardarImagen = (file) => {
    let ext = "";

    if (file.mimetype === "image/jpeg") {
        ext = "jpeg";
    }
    if (file.mimetype === "image/png") {
        ext = "png";
    }

    const originalname = file.originalname.split(".")[0].replace(/\s/g, "-");
    const nombreArchivo = `${originalname}_${Date.now()}.${ext}`;

    const carpetaUpload = path.join(__dirname, '../../tp/frontend/uploads');
    const newPath = path.join(carpetaUpload, nombreArchivo);

    fs.renameSync(file.path, newPath);

    return `http://localhost:3000/uploads/${nombreArchivo}`;
}


// POST /admin/productos/nuevo
const crearProducto = async (req, res) => {
    try {
        const { descripcion, precio, id_tipo_producto } = req.body;

        const rutaImagen = await guardarImagen(req.file);
        console.log(rutaImagen);
        
        await Producto.create({
            descripcion,
            precio,
            id_tipo_producto,
            imagen:rutaImagen,
            estado: true,          // activo por defecto
            id_admin: req.session.admin.id,
            fecha_modificacion: new Date()
        });

        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.send("Error al crear producto");
    }
};

// GET /admin/productos/:id/editar
const mostrarFormularioEditar = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        const tipos = await Tipo_producto.findAll();

        if (!producto) {
            return res.send("Producto no encontrado");
        }

        res.render('editar', {
            admin: req.session.admin,
            producto,
            tipos,
            accion: 'editar'
        });

    } catch (error) {
        console.error("Error al mostrar formulario editar:", error);
        return res.send("Error al mostrar formulario");
    }
};

// POST /admin/productos/:id/editar
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, precio, id_tipo_producto} = req.body;

        const rutaImagen = await guardarImagen(req.file);

        await Producto.update(
            {
                descripcion,
                precio,
                id_tipo_producto,
                imagen:rutaImagen,
                id_admin: req.session.admin.id,
                fecha_modificacion: new Date()
            },
            { where: { id_producto: id } }
        );

        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.send("Error al actualizar producto");
    }
};

// POST /admin/productos/:id/desactivar
const desactivarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        await Producto.update(
            {
                estado: false,
                id_admin: req.session.admin.id,
                fecha_modificacion: new Date()
            },
            { where: { id_producto: id } }
        );

        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error("Error al desactivar producto:", error);
        return res.send("Error al desactivar producto");
    }
};

// POST /admin/productos/:id/activar
const activarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        await Producto.update(
            {
                estado: true,
                id_admin: req.session.admin.id,
                fecha_modificacion: new Date()
            },
            { where: { id_producto: id } }
        );

        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error("Error al activar producto:", error);
        return res.send("Error al activar producto");
    }
};

// POST /admin/logout
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
};

module.exports = {
    mostrarLogin,
    procesarLogin,
    loginRapido,
    crearUsuario,
    mostrarDashboard,
    mostrarFormularioAlta,
    crearProducto,
    mostrarFormularioEditar,
    actualizarProducto,
    desactivarProducto,
    activarProducto,
    logout
};
