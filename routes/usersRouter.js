import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import followersContr from "../controllers/userControllers.js";

const router = Router();

router.use(authenticate);

router.get("/following", followersContr.getFollowing);

router.get("/:id/followers", followersContr.getFollowers);

router.post("/:id/follow", followersContr.addNewFollower);

router.delete("/:id/follow", followersContr.deleteFollower);

export default router;
