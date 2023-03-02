// constante del modelo de datos
const Compras = require("../model/productos");

// Obtener todos los objetos
const getCompras = async (req, res) => {
    try {
        const compras = await Compras.find({})
        .populate('usuarios')
        .populate({
            path: 'productos.producto',
            model: 'productos'
        });

        res.json(compras);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
  };

// Obtener un objeto por su id 
const getComprasById = async(req, res, next) => {
    try {
        const compra = await Compras.findById(req.params.id)
        .populate('usuarios')
        .populate({
            path: 'productos.producto',
            model: 'productos'
        });

        if (!compra) {
            res.status(404).json({message: 'La orden no existe'});
            next();
        }

        res.json(compra);

    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}

// Crear un objeto con el formato indicado
  const createCompras = async (req, res) => {
    try {
        const compra = new Compras(req.body);
        await compra.save();
        res.json(compra);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
  };


// actualizar un elemento a partir del _id
const updateCompras = async (req, res) => {
    try {
        const compra = await Compras.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true},
        )
        .populate('usuarios')
        .populate({
            path: 'productos.producto',
            model: 'productos'
        });

        res.json(compra);
    } catch (error) {
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}


// 
module.exports = {
    getCompras,
    getComprasById,
    createCompras,
    updateCompras,
  };