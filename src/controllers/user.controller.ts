import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const postUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, rol } = req.body;
  const user = new UserModel({ name, email, password, rol });

  //Encliptar la contraseña (hash)

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //Guardar en BD
  await user.save();

  res.status(201).json({
    msg: "Usuario creado correctamente",
    user,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  res.json({
    msg: "getUsers - Controlador",
  });
};
