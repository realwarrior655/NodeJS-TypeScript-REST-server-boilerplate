import { Request, Response } from "express";
import CourseModel from "../models/course.model";

//Get all courses
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await CourseModel.find();
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
};

//Create a new course

export const postCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, duration, level, img } = req.body;
    const course = new CourseModel({
      title,
      description,
      duration,
      level,
      img,
    });
    await course.save();
    res.status(201).json({ msg: "Curso creado correctamente", course });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el curso" });
  }
};

//Update course
export const putCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ msg: "Curso actualizado correctamente", course });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el curso" });
  }
};

//Delete course
