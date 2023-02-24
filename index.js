// definicion de librerias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// routes
const usuariosRuta = require("./routes/usuarios");
const productosRuta = require("./routes/productos");


// variables de entorno
dotenv.config();

// Puerto 
const PORT = process.env.PORT || 8000;
const app = express();

// Libreria para mongodb - usa URL que debe existir en .env
// usa la Base de datos llamada mongo y la coleccion llamada todos
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


// se usa con express, peticiones cruzadas.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// uso de routers
app.use("/usuarios", usuariosRuta);
app.use("/productos", productosRuta);


app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
