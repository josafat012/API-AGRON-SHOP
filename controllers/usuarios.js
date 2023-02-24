// constante del modelo de datos
const Usuarios = require("../model/usuarios");

// Obtener todos los objetos
const getUsuarios = async (req, res) => {
  Usuarios.find((err, usuarios) => {
    if (err) {
      res.send(err);
    }
    res.json(usuarios);
  });
};

// Obtener un objeto por su id 
const validLogin = async (req, res) => {
  try {
    let username = req.params.usuariosNOMBREUSUARIO
    let password = req.params.usuariosCONTRASENA
    let datos = []
    const user = await Usuarios.findOne({nombreUsuario: req.params.usuariosNOMBREUSUARIO}).exec()
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" })
    } 
    if (username === user.nombreUsuario) {
      console.log("paso if user")
      if(password === user.contrasena){
        console.log('paso if passw')
        datos.push(user._id, user.esVendedor, user.nombreUsuario)
        console.log(username, password, datos)
        return res.status(200).json({ datos })
      } else {
        return res.status(400).send({ message: "Contraseña incorrecta" })
      }
    } else {
      return res.status(400).send({ message: "Nombre de usuario incorrecto" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error: "Error en el servidor" })
  }
};



// Crear un objeto con el formato indicado
const createUsuarios = async (req, res) => {
  const usuario = new Usuarios({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    nombreUsuario: req.body.nombreUsuario,
    correo: req.body.correo,
    contrasena: req.body.contrasena,
    esVendedor: req.body.esVendedor
  });

  usuario.save( async (err, usuarios) => {
    if (err) {
      res.send(err);
    }
    res.json(usuarios);
  });
};

// actualizar un elemento a partir del _id
const updateUsuarios = async (req, res) => {
  Usuarios.findOneAndUpdate(
    { _id: req.params.usuariosID },
    {
      $set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        nombreUsuario: req.body.nombreUsuario,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        esVendedor: req.body.esVendedor
      },
    },
    { new: true },
    (err, Usuarios) => {
      if (err) {
        res.send(err);
      } else res.json(Usuarios);
    }
  );
};

// borrar un elemento a través del _id
const deleteUsuarios = async (req, res) => {
  Usuarios.deleteOne({ _id: req.params.usuariosID })
    .then(() => res.json({ message: "Usuario Eliminado" }))
    .catch((err) => res.send(err));
};

// 
module.exports = {
  getUsuarios,
  validLogin,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
};
