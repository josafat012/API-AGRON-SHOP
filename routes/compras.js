const {
    getCompras,
    createCompras,
    updateCompras,
    getComprasById,
} = require('../controllers/compras');

const router = require("express").Router();

router.get("/", getCompras);
router.get("/:id", getComprasById);
router.post("/", createCompras);
router.put("/:id", updateCompras);

module.exports = router;