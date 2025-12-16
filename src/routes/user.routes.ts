import { Router } from "express";
import { check } from "express-validator";

import { getUsers, postUser } from "../controllers/user.controller";
import { validarCampos } from "../middlewares/validar-campos";
import { putUser } from "../controllers/put.controller";
import { delUser } from "../controllers/delete.controller";

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
router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("rol").optional().isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  putUser
);
router.delete(
  "/:id",
  [check("id", "El ID no es válido").isMongoId(), validarCampos],
  delUser
);

export default router;
