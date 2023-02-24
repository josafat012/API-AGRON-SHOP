const {
    getProductos,
    createProductos,
    updateProductos,
    deleteProductos,
} = require('../controllers/productos');

const router = require("express").Router();

router.get("/", getProductos);
router.post("/", createProductos);
router.put("/:productosID", updateProductos);
router.delete("/:productosID", deleteProductos);

module.exports = router;