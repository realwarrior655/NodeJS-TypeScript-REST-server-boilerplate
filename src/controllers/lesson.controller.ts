import { Request, Response } from "express";
import LessonModel from "../models/lesson.model";
import CourseModel from "../models/course.model";
import { Create_Lesson } from "../interfaces/Create_ILesson";
import { isValidObjectId } from "mongoose";

//Get all lessons
export const getLessons = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const filter = courseId && isValidObjectId(courseId) ? { courseId } : {};
    const lessons = await LessonModel.find(filter);
    res.json({ lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar las lecciones" });
  }
};

//Create a new lesson
export const postLesson = async (req: Request, res: Response) => {
  try {
    const { title, content, duration } = req.body as Create_Lesson;
    const courseId =
      (req.params.courseId as string) ??
      (req.body.courseId as string | undefined);

    if (courseId && !isValidObjectId(courseId)) {
      return res.status(400).json({ error: "courseId inválido" });
    }

    const lesson = new LessonModel({
      title,
      content,
      duration,
      courseId,
    });
    await lesson.save();

    if (courseId) {
      await CourseModel.findByIdAndUpdate(courseId, {
        $push: { lessons: lesson._id },
      });
    }

    res.status(201).json({ msg: "Lección creada correctamente", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo crear la lección" });
  }
};

//Update lesson
export const updateLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ error: "ID inválido" });

    const lesson = await LessonModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!lesson)
      return res.status(404).json({ error: "Lección no encontrada" });

    res.json({ msg: "Lección actualizada correctamente", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la lección" });
  }
};

//Delete lesson
export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ error: "ID inválido" });

    const deleted = await LessonModel.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ error: "Lección no encontrada" });

    if (deleted.courseId && isValidObjectId(String(deleted.courseId))) {
      await CourseModel.findByIdAndUpdate(String(deleted.courseId), {
        $pull: { lessons: deleted._id },
      });
    }

    res.json({ msg: "Lección eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar la lección" });
  }
};
