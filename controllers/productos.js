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
  createProductos,
  updateProductos,
  deleteProductos,
};