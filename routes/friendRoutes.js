//* imports
import express from "express";
import { acceptFriendRequest, denyFriendRequest, removeFriend, sendFriendRequest } from "../controllers/friendController.js";

//* variables
const router = express.Router();

router.route("/send-request").post(sendFriendRequest);
router.route("/accept-request").post(acceptFriendRequest);
router.route("/deny-request").post(denyFriendRequest);
router.route("/remove-friend").delete(removeFriend);

//* export
export default router;
