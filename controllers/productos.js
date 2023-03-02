// constante del modelo de datos
const Productos = require("../model/productos");

// Obtener todos los objetos
const getProductos = async (req, res) => {
  Productos.find((err, productos) => {
    if (err) {
      res.send(err);
    }
    res.json(productos);
  });
};

const getProductosById = async(req, res) => {
  try {
    let categoria = req.params.productosCATEGORIA
    const product = await Productos.find({categoria: req.params.productosCATEGORIA}).exec()
    
    return res.status(200).json(product)
  } catch (error) {
    console.error(error)
    return res.status(400).json({message: 'Error en la peticion'});
  }
}

// Crear un objeto con el formato indicado
const createProductos = async (req, res) => {
  const producto = new Productos({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    proveedor: req.body.proveedor
  });

  producto.save( async (err, productos) => {
    if (err) {
      res.send(err);
    }
    res.json(productos);
  });
};

// actualizar un elemento a partir del _id
const updateProductos = async (req, res) => {
  Productos.findOneAndUpdate(
    { _id: req.params.productosID },
    {
      $set: {
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        proveedor: req.body.proveedor
      },
    },
    { new: true },
    (err, Productos) => {
      if (err) {
        res.send(err);
      } else res.json(Productos);
    }
  );
};

// borrar un elemento a través del _id
const deleteProductos = async (req, res) => {
  Productos.deleteOne({ _id: req.params.productosID })
    .then(() => res.json({ message: "Producto Eliminado" }))
    .catch((err) => res.send(err));
};

// 
module.exports = {
  getProductos,
  getProductosById,
  createProductos,
  updateProductos,
  deleteProductos,
};