require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/authRoutes");

const app = express();

// Configuración de Express
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API CatalogoAPI funcionando correctamente"
  });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Conexión con MongoDB
async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
}

iniciarServidor();