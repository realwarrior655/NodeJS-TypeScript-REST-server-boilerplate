import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const putUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  //TODO validar contra base de datos

  if (password) {
    //Encliptar la contraseña (hash)
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, resto, { new: true });

  res.json();
};
