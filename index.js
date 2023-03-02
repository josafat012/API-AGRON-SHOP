// definicion de librerias
const express = require("express");
const fs = require("fs");
const https = require("https");

const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// routes
const usuariosRuta = require("./routes/usuarios");
const productosRuta = require("./routes/productos");
const { url } = require("inspector");


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


app.get("/", (req, res) => {
	res.json({ message: "Hello World"  });
})

app.get("/health-check", (req, res) => {
	res.json({ message: "Server up and running"  });
})


// uso de routers
app.use("/usuarios", usuariosRuta);
app.use("/productos", productosRuta);


https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/archive/agronshop.iothings.com.mx/cert1.pem'),
  key: fs.readFileSync('/etc/letsencrypt/archive/agronshop.iothings.com.mx/privkey1.pem')
  },app).listen(PORT, function(){
  console.log(`Servidor https corriendo en el puerto ${PORT}`);
  });
