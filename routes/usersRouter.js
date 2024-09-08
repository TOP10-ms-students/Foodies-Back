import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import followersContr from "../controllers/followersController.js";

const router = Router();

router.use(authenticate);

router.get("/:id/follower/:followerId", followersContr.getOneFollower);

router.get("/:id/followers", followersContr.getFollowers);

router.post("/:id/follower", followersContr.addNewFollower);

router.delete("/:id/follower", followersContr.deleteFollower);

export default router;
