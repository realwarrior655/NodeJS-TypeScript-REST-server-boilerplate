import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../models/user.model";

export const delUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  res.json();
};
