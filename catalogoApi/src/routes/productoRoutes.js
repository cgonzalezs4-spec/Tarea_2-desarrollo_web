
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Producto = require("../models/Producto");

const {
  verificarToken,
  soloAdmin
} = require("../middleware/authMiddleware");

// GET - Listar productos y filtrar por categoría
router.get("/", async (req, res) => {
  try {
    const filtro = {};

    if (req.query.categoria) {
      filtro.categoria = req.query.categoria;
    }

    const productos = await Producto.find(filtro);

    return res.status(200).json(productos);

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al consultar productos"
    });
  }
});

// GET - Consultar un producto por ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto inválido"
      });
    }

    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    return res.status(200).json(producto);

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al consultar el producto"
    });
  }
});

// POST - Crear producto (solo administrador)
router.post("/", verificarToken, soloAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio } = req.body || {};

    if (
      typeof nombre !== "string" ||
      !nombre.trim() ||
      typeof descripcion !== "string" ||
      !descripcion.trim() ||
      typeof categoria !== "string" ||
      !categoria.trim() ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio < 0.01
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos, complete todos los campos y establezca un precio válido"
      });
    }

    const producto = await Producto.create({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria: categoria.trim(),
      precio
    });

    return res.status(201).json({
      mensaje: "Producto creado correctamente",
      producto
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al crear producto"
    });
  }
});

// PUT - Actualizar producto (solo administrador)
router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto inválido"
      });
    }

    const { nombre, descripcion, categoria, precio } = req.body || {};

    if (
      typeof nombre !== "string" ||
      !nombre.trim() ||
      typeof descripcion !== "string" ||
      !descripcion.trim() ||
      typeof categoria !== "string" ||
      !categoria.trim() ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio < 0.01
    ) {
      return res.status(400).json({
        mensaje: "Datos inválidos para actualizar el producto"
      });
    }

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        categoria: categoria.trim(),
        precio
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      producto
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al actualizar producto"
    });
  }
});

// DELETE - Eliminar producto (solo administrador)
router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto inválido"
      });
    }

    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      mensaje: "Producto eliminado correctamente"
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al eliminar producto"
    });
  }
});

module.exports = router;
