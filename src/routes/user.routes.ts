import { Router } from "express";
import { check } from "express-validator";

import { getUsers, postUser } from "../controllers/user.controller";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();
router.get("/", getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
  ],
  validarCampos,
  postUser
);

export default router;
