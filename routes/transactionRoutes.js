//* import
import express from "express";
import { makeTransaction } from "../controllers/transactionController.js";

//* variables
const router = express.Router();

//* routes
router.route("/make").post(makeTransaction);

//* export
export default router;
