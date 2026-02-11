import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../models/user.model";

//Get all users
export const getUsers = async (req: Request, res: Response) => {
  res.json({
    msg: "getUsers - Controlador",
  });
};

//Create a new user
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    //destructuring de los datos que vienen en el body
    const { name, email, password, rol } = req.body;
    const user = new UserModel({ name, email, password, rol });

    //Encriptar la contraseña (hash)

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await user.save();

    res.status(201).json({
      msg: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el usuario",
    });
  }
};

//Update user
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

//Delete user
export const delUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  res.json();
};

//Self-delete user
export const delSelfUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const usuarioAuth = (req as any).usuarioAuth;
  const user = await UserModel.findByIdAndUpdate(
    usuarioAuth._id,
    { estado: false },
    { new: true },
  );
  res.json(user);
};
