import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import courseModel from "../models/course.model";

const validarCursos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { courseId } = req.params;
  if (!isValidObjectId(courseId)) {
    return res.status(500).json({ message: "El ID del curso no es válido" });
  } else {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "El curso no existe" });
    }
    next();
  }
};

export default validarCursos;
