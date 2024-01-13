//* imports
import express from "express";
import {
  getAllUsers,
  registerUser,
  updateUser,
  loginUser,
  getUserInfo,
} from "../controllers/userController.js";

//* variables
const router = express.Router();

//* methods
router.route("/").get(getAllUsers).post(registerUser).patch(updateUser);
router.route("/login").post(loginUser);
router.route("/info").post(getUserInfo);

//* exports
export default router;
