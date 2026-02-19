import { Schema, model, Types } from "mongoose";
import { Create_Course } from "../interfaces/Create_ICourses";

const CourseSchema = new Schema<Create_Course>({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  duration: {
    type: Number,
    required: [true, "La duración es obligatoria"],
  },
  lessons: [{ type: Types.ObjectId, ref: "Lesson" }],
  level: {
    type: String,
    required: true,
    enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
  },
  img: {
    type: String,
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

CourseSchema.methods.toJSON = function () {
  const { __v, _id, ...course } = this.toObject();
  course.id = _id;
  return course;
};

const CourseModel = model<Create_Course>("Course", CourseSchema);

export default CourseModel;
