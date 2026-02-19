import { Schema, model } from "mongoose";
import { Create_Lesson } from "../interfaces/Create_ILesson";

const LessonSchema = new Schema<Create_Lesson>({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  content: {
    type: String,
    required: [true, "El contenido es obligatorio"],
  },
  duration: {
    type: Number,
    required: [true, "La duración es obligatoria"],
  },
  courseId: {
    type: String,
    required: [true, "El ID del curso es obligatorio"],
  },
});

export default model("Lesson", LessonSchema);
