import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import usersController from "../controllers/usersController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.use(authenticate);

router.get("/current", usersController.getCurrentUser);

router.get("/following", usersController.getFollowing);

router.get("/:id", usersController.getUser);

router.get("/:id/followers", usersController.getFollowers);

router.post("/:id/follow", usersController.startFollow);

router.delete("/:id/follow", usersController.stopFollow);

router.patch("/avatar", upload.single("avatar"), usersController.addAvatar);

export default router;
