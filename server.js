import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";
import userRoutes from "./routes/userRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import connectDB from "./database/connectDB.js";
import compression from "compression";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an instance of Express
const app = express();

// Set the port
const PORT = process.env.PORT || 8080;

// Use compression for response payload
// app.use(compression());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

// Apply middleware
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/transactions", transactionRoutes);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// Handle asynchronous errors globally
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
