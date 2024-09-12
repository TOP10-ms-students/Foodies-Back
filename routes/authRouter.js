import express from "express";
import authController from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import {signUpSchema, signInSchema} from "../schemas/authSchemas.js";
import authenticate from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), authController.signUp);

authRouter.post("/login", validateBody(signInSchema), authController.signIn);

authRouter.post("/logout", authenticate, authController.logOut);

export default authRouter;
