import { Router } from "express";
const router = Router();
import { authControllers } from "../controllers/login.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { authSchema } from "../schemas/user.schema.js";
import { authRequired } from "../middlewares/validatorToken.middleware.js";

router.post(
  "/auth/login",
  validateSchema(authSchema),
  authControllers.login
);

router.post(
  "/auth/callback/credentials",
  validateSchema(authSchema),
  authControllers.login
);

router.post(
  "/auth/register",
  validateSchema(authSchema),
  authControllers.register
);



export default router;