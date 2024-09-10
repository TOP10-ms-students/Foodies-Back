import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import userContr from "../controllers/userControllers.js";

const router = Router();

router.use(authenticate);

router.get("/following", userContr.getFollowing);

router.get("/:id/followers", userContr.getFollowers);

router.post("/:id/follow", userContr.addNewFollower);

router.delete("/:id/follow", userContr.deleteFollower);

export default router;
