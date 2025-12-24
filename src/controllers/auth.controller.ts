import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model";
import { createJWToken } from "../helpers/create_JWT";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.status) {
      return res.status(400).json({ message: "User is inactive" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createJWToken(user.id);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
