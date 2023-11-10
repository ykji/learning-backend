import { DB_NAME } from "../constansts.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "MongoDB connected - DB Host: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MongoDB Connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
