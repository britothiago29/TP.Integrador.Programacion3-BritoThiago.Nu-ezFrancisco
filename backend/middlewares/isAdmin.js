console.log("EL MIDDLEWARE isAdmin FUE CARGADO");

module.exports = (req, res, next) => {


    // Si NO hay admin en sesión → redirigir al login
    if (!req.session || !req.session.admin) {
        return res.redirect("/panel/login");
    }

    next();
};
