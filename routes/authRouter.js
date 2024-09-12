import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {signUpSchema, signInSchema} from "../schemas/authSchemas.js";
import authenticate from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), authControllers.signUp);

authRouter.post("/login", validateBody(signInSchema), authControllers.signIn);

authRouter.post("/logout", authenticate, authControllers.logOut);

export default authRouter;
