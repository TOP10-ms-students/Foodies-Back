import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import followersContr from "../controllers/followersController.js";

const router = Router();

router.use(authenticate);

router.get("/followers", followersContr.getFollowers);

router.get("/follows", followersContr.getFollows);

router.post("/followers/:followerId", followersContr.addNewFollower);

router.delete("/followers/:followerId", followersContr.deleteFollower);

export default router;
