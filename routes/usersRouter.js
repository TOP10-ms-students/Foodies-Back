import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import userContr from "../controllers/usersController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.use(authenticate);

router.get("/following", userContr.getFollowing);

router.get("/:id/followers", userContr.getFollowers);

router.post("/:id/follow", userContr.addNewFollower);

router.delete("/:id/follow", userContr.deleteFollower);

router.patch("/avatar", upload.single("avatar"), userContr.addAvatar);

router.patch("/avatar", upload.single("avatar"), userContr.addAvatar);

export default router;
