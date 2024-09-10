import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../middleware/validateBody.js";
import {signupSchema, loginSchema} from "../schemas/usersSchemas.js";
import upload from "../middleware/upload.js";
import authenticate from "../middleware/authenticate.js";

const validateRequestBody = validateBody(signupSchema);
const validateLoginBody = validateBody(loginSchema);

const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), validateRequestBody, authControllers.signUp);

authRouter.post("/login", validateLoginBody, authControllers.logIn);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.post("/logout", authenticate, authControllers.logOut);

export default authRouter;
