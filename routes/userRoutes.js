//* imports
import express from "express";
import {
  getAllUsers,
  registerUser,
  updateUser,
  loginUser,
  getUserInfo,
} from "../controllers/userController.js";
import { isAuth } from "../auth/auth.js";

//* variables
const router = express.Router();

//* methods
router
  .route("/")
  .get(isAuth, getAllUsers)
  .post(registerUser)
  .patch(isAuth, updateUser);
router.route("/login").post(loginUser);
router.route("/info").post(isAuth, getUserInfo);

//* exports
export default router;
