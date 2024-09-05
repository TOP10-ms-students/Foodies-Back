import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";
import usersController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.patch("/avatar", authenticate, upload.single("avatar"), usersController.addAvatar);

export default usersRouter;
