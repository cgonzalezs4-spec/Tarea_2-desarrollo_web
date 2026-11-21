
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

// Verificar que el usuario tenga un token JWT válido
const verificarToken = async (req, res, next) => {
  try {
    const autorizacion = req.headers.authorization;

    if (
      !autorizacion ||
      !autorizacion.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        mensaje: "Acceso denegado, token no proporcionado"
      });
    }

    const token = autorizacion.split(" ")[1];

    const datos = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Buscar al usuario asociado al token
    const usuario = await Usuario.findById(datos.id);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no encontrado o token inválido"
      });
    }

    // Guardar el usuario autenticado para las siguientes rutas
    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado"
    });
  }
};

// Permitir únicamente el acceso a administradores
const soloAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "admin") {
    return res.status(403).json({
      mensaje: "Acceso denegado, se requiere rol administrador"
    });
  }

  next();
};

module.exports = {
  verificarToken,
  soloAdmin
};
