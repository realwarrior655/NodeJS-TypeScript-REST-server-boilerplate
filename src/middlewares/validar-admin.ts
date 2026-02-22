import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

const validarAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Obtener el usuario del body o del request
    const userId = (req.body as any).userId;

    if (!userId) {
      return res.status(401).json({
        msg: "No hay usuario autenticado",
      });
    }

    // Buscar el usuario en la base de datos
    const usuario = await UserModel.findById(userId);

    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no encontrado",
      });
    }

    // Verificar si el usuario tiene rol de ADMIN
    if (usuario.rol !== "ADMIN_ROLE") {
      return res.status(403).json({
        msg: "El usuario no tiene permisos de administrador para acceder a este recurso",
      });
    }

    // Si todo es correcto, continuar a la siguiente función
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error al validar permisos de administrador",
    });
  }
};

export default validarAdmin;
