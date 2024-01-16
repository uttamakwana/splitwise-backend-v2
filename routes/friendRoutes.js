//* imports
import express from "express";
import {
  acceptFriendRequest,
  denyFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../controllers/friendController.js";
import { isAuth } from '../auth/auth.js';

//* variables
const router = express.Router();

router.route("/send-request").post(isAuth, sendFriendRequest);
router.route("/accept-request").post(isAuth, acceptFriendRequest);
router.route("/deny-request").post(isAuth, denyFriendRequest);
router.route("/remove-friend").delete(isAuth, removeFriend);

//* export
export default router;
