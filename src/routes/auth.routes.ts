import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller";
import { validarCampos } from "../middlewares/validar-campos";

//Inicializar el Router
const router = Router();

//Rutas de auth

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);
export default router;
