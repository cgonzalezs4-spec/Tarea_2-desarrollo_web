
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTRO DE USUARIOS
const registrar = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body || {};

    // Validar los datos recibidos
    if (
      typeof nombre !== "string" ||
      !nombre.trim() ||
      typeof correo !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim()) ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return res.status(400).json({
        mensaje: "Nombre, correo válido y contraseña de mínimo 8 caracteres son obligatorios"
      });
    }

    // Normalizar el correo electrónico
    const correoNormalizado = correo.trim().toLowerCase();

    // Comprobar si el correo ya está registrado
    const existe = await Usuario.findOne({
      correo: correoNormalizado
    });

    if (existe) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    // Cifrar la contraseña
    const passwordHash = await bcrypt.hash(password, 12);

    // Crear el usuario en MongoDB
    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      correo: correoNormalizado,
      password: passwordHash,
      rol: "usuario"
    });

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    return res.status(500).json({
      mensaje: "Error interno al registrar usuario"
    });
  }
};

// INICIO DE SESIÓN
const login = async (req, res) => {
  try {
    const { correo, password } = req.body || {};

    // Validar los datos de acceso
    if (
      typeof correo !== "string" ||
      !correo.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios"
      });
    }

    // Buscar el usuario registrado
    const usuario = await Usuario.findOne({
      correo: correo.trim().toLowerCase()
    }).select("+password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    // Comparar la contraseña ingresada
    const valida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!valida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    // Generar token JWT con duración de una hora
    const token = jwt.sign(
      { id: usuario._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      mensaje: "Inicio de sesión correcto",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error interno al iniciar sesión"
    });
  }
};

// Exportar las funciones
module.exports = {
  registrar,
  login
};
