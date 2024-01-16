//* import
import express from "express";
import { makeTransaction } from "../controllers/transactionController.js";
import { isAuth } from "../auth/auth.js";

//* variables
const router = express.Router();

//* routes
router.route("/make").post(isAuth, makeTransaction);

//* export
export default router;
