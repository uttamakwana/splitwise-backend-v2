// Define the allowed origins
export const allowedOrigins = [
  "http://localhost:5173",
];

// Set up CORS options
export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
  allowedHeaders: "Content-Type, Authorization", // Specify allowed headers
};
