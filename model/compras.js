// Modelo de datos de Mongo
const mongoose = require("mongoose");

// Definicion del esquema a utilizar 
const ComprasSchema = new mongoose.Schema({
    created: {
      type: Date,
      default: Date.now,
    },
    usuario: {
      type: mongoose.Schema.ObjectId,
      ref: 'usuarios',
    },
    productos: [{
        producto: {
            type: mongoose.Schema.ObjectId,
            ref: 'productos',
        },
        precioUnitario: {
            type: Number,
        },
        cantidad: {
            type: Number,
        },
        importe: {
            type: Number,
        },
    }],
    importeTotal: {
        type: Number,
    }
  });
  
  module.exports = mongoose.model("compras", ComprasSchema);