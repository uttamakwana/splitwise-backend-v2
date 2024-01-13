//* import
import mongoose from "mongoose";

//* method
const connectDB = async () => {
  const database = await mongoose.connect(process.env.MONGO_URI);
  console.log(database.connection.host);
  console.log(database.connection.name);
};

export default connectDB;
