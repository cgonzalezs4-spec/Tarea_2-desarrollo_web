
const express = require("express");
const router = express.Router();

const Producto = require("../models/Producto");

// GET - Listar todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar productos"
    });
  }
});

module.exports = router;
