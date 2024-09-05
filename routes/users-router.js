import { Router } from "express";
import authenticate from "../middleware/authenticate";
import followersContr from "../controllers/followersController.js";

const router = Router();

router.patch("/:id/follower", authenticate, followersContr.addNewFollower);

router.delete("/:id/follower", authenticate, followersContr.deleteFollower);

export default router;
