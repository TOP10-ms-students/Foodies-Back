import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import userController from "../controllers/userController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.use(authenticate);

router.get("/current", userController.getCurrentUser);

router.get("/following", userController.getFollowing);

router.get("/:id", userController.getUser);

router.get("/:id/followers", userController.getFollowers);

router.post("/:id/follow", userController.startFollow);

router.delete("/:id/follow", userController.stopFollow);

router.patch("/avatar", upload.single("avatar"), userController.addAvatar);

export default router;
