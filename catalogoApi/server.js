require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API CatalogoAPI funcionando correctamente"
  });
});

const PORT = process.env.PORT || 3000;

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