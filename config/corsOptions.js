// Define the allowed origins
const allowedOrigins = [
  "https://splitwise-expense.netlify.app",
  "https://splitwise-expense.netlify.app/home",
  "https://splitwise-expense.netlify.app/register",
  "https://splitwise-expense.netlify.app/all-users",
  "https://splitwise-expense.netlify.app/request",
  "https://splitwise-expense.netlify.app/transaction",
  "https://splitwise-expense.netlify.app/friends",
  "https://splitwise-expense.netlify.app/history",
  "http://localhost:5173",
];

// Set up CORS options
const corsOptions = {
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
