import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import followersContr from "../controllers/followersController.js";

const router = Router();

router.use(authenticate);

router.post("/:id/follower", followersContr.addNewFollower);

router.delete("/:id/follower", followersContr.deleteFollower);

export default router;
