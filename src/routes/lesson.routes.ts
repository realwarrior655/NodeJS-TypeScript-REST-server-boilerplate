//IMPORTS GENERALES
import { Router } from "express";
import { check } from "express-validator";

//IMPORTS CONTROLLERS
import {
  getLessons,
  postLesson,
  updateLesson,
  deleteLesson,
} from "../controllers/lesson.controller";

//IMPORT MIDDLEWARES
import validarAdmin from "../middlewares/validar-admin";

const router = Router({ mergeParams: true });

router.get("/lessons", getLessons);
router.post("/lessons", validarAdmin, postLesson);
router.put("/lessons/:id", validarAdmin, updateLesson);
router.delete("/lessons/:id", validarAdmin, deleteLesson);

export default router;
