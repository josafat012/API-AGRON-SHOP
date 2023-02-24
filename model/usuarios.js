// Modelo de datos de Mongo
const mongoose = require("mongoose");

// Definicion del esquema a utilizar 
const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: String,
    required: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  esVendedor: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("usuarios", UsuarioSchema);