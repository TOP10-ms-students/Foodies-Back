import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import followersContr from "../controllers/followersController.js";
import upload from "../middleware/upload.js";
import usersController from "../controllers/usersController.js";

const router = Router();

router.use(authenticate);

router.post("/:id/follower", followersContr.addNewFollower);

router.delete("/:id/follower", followersContr.deleteFollower);

router.patch("/avatar", upload.single("avatar"), usersController.addAvatar);

export default router;
