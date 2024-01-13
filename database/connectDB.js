import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to MongoDB at ${database.connection.host}`);
    console.log(`Database name: ${database.connection.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // You might want to handle the error appropriately (e.g., throw it, log it, etc.)
  }
};

export default connectDB;
