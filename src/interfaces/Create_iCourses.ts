import { Types } from "mongoose";

export interface Create_Course {
  title: string;
  description: string;
  duration: number; // Duración en minutos
  lessons?: Types.ObjectId[] | string[]; // Array de IDs de lecciones
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  img?: string;
  status: boolean;
}
