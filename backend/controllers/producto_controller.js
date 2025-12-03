const { Producto, Tipo_producto } = require("../models/index");

const ObtenerProductos = async (req, res) => {
    try {
        const { categoria } = req.query;
        let where = { estado: true };

        // Si viene categoria en la URL ?categoria=1
        if (categoria) {
            where.id_tipo_producto = categoria;
        }

        // Traer productos + el tipo de producto asociado
        const productos = await Producto.findAll({
            where,
            include: [{
                model: Tipo_producto,
                attributes: ["descripcion"]  // ← "zapatillas", "ropa"
            }]
        });

        // Transformar al formato que usa el FRONTEND
        const productosFront = productos.map(p => ({
            id_producto: p.id_producto,
            descripcion: p.descripcion,
            precio: p.precio,
            imagen: p.imagen,
            tipo: p.Tipo_Producto.descripcion   // ← muy importante
        }));

        res.json(productosFront);

    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

module.exports = { ObtenerProductos };
