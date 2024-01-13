//* imports
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import connectDB from "./database/connectDB.js";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

//* config
//? Does: You can use environment variables
dotenv.config();
connectDB();

//* variables
const app = express();
const PORT = process.env.PORT || 8080;

//* middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://splitwise-expense.netlify.app",
    credentials: true,
  })
);

//* routes
app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/transactions", transactionRoutes);

//* methods
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
