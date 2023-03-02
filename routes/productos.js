const {
    getProductos,
    createProductos,
    updateProductos,
    deleteProductos,
    getProductosById,
} = require('../controllers/productos');

const router = require("express").Router();

router.get("/", getProductos);
router.get("/:productosCATEGORIA", getProductosById);
router.post("/", createProductos);
router.put("/:productosID", updateProductos);
router.delete("/:productosID", deleteProductos);

module.exports = router;