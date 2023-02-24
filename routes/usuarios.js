const {
    getUsuarios,
    validLogin,
    createUsuarios,
    updateUsuarios,
    deleteUsuarios,
} = require('../controllers/usuarios');

const router = require("express").Router();

router.get("/", getUsuarios);
router.get("/:usuariosNOMBREUSUARIO/:usuariosCONTRASENA", validLogin);
router.post("/", createUsuarios);
router.put("/:usuariosID", updateUsuarios);
router.delete("/:usuariosID", deleteUsuarios);

module.exports = router;