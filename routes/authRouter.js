import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../middleware/validateBody.js";
import {signupSchema} from "../schemas/usersSchemas.js";
import upload from "../middleware/upload.js";

const validateRequestBody = validateBody(signupSchema);

const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), validateRequestBody, authControllers.signup);

export default authRouter;
