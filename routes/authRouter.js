import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../middleware/validateBody.js";
import {signupSchema, loginSchema} from "../schemas/usersSchemas.js";
import authenticate from "../middleware/authenticate.js";

const validateRequestBody = validateBody(signupSchema);
const validateLoginBody = validateBody(loginSchema);

const authRouter = express.Router();

authRouter.post("/signUp", validateRequestBody, authControllers.signUp);

authRouter.post("/signIn", validateLoginBody, authControllers.signIn);

authRouter.post("/logout", authenticate, authControllers.logOut);

export default authRouter;
