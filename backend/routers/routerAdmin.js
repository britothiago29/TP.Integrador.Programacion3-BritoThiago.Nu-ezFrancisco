console.log("ROUTER ADMIN CARGADO!");

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/login", adminController.login);
router.post("/login", adminController.processLogin);

router.get("/", isAdmin, adminController.dashboard);

router.get("/productos/crear", isAdmin, adminController.createForm);
router.post("/productos/crear", isAdmin, adminController.create);

router.get("/productos/editar/:id", isAdmin, adminController.editForm);
router.post("/productos/editar/:id", isAdmin, adminController.update);

router.post("/productos/activar/:id", isAdmin, adminController.activate);
router.post("/productos/desactivar/:id", isAdmin, adminController.deactivate);




module.exports = router;
