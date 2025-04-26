import { Router } from "express";
import {
  loginValidation,
  signupValidation,
} from "../middlerwares/AuthValidation.js";
import { login, signup } from "../controller/AuhController.js";

const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
