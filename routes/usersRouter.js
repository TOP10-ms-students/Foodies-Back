import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import usersController from "../controllers/usersController.js";
import upload from "../middleware/upload.js";
import authControllers from "../controllers/authControllers.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use(authenticate);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.get("/:id", authenticate, authControllers.getUser);

router.get("/following", usersController.getFollowing);

router.get("/:id/followers", usersController.getFollowers);

router.post("/:id/follow", usersController.addNewFollower);

router.delete("/:id/follow", usersController.deleteFollower);

router.patch("/avatar", upload.single("avatar"), usersController.addAvatar);

export default router;
