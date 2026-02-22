//IMPORTS GENERALES
import { Router } from "express";
import { check } from "express-validator";

//iMPORTS CONTROLLERS
import {
  getCourses,
  postCourse,
  putCourse,
  deleteCourse,
} from "../controllers/course.controller";
import lessonRouter from "./lesson.routes";

//IMPORTS MIDDLEWARES
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import validarAdmin from "../middlewares/validar-admin";
import validarCursos from "../middlewares/validar-course";

const router = Router();

//OBTENER COURSES
router.get("/", getCourses);

//CREAR COURSE
router.post(
  "/",
  validarJWT, // Verificar que esté autenticado
  validarAdmin, // Verificar que sea ADMIN
  [check("title", "El título es obligatorio").not().isEmpty()],
  validarCampos,
  postCourse,
);

// PUT - Solo admins pueden actualizar
router.put("/:id", validarJWT, validarAdmin, putCourse);

// DELETE - Solo admins pueden eliminar
router.delete("/:id", validarJWT, validarAdmin, deleteCourse);

// dentro de tu router de courses:
router.use("/:courseId/lessons", validarCursos, lessonRouter);

export default router;
