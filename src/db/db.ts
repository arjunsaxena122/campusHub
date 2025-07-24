import mongoose from "mongoose";
import { env } from "../config/config";
import { ApiError } from "../utils/api-error.util";

const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
  } catch (err) {
    throw new ApiError(503, `ERROR: DB connection failed -> ${err}`);
  }
};

export default connectDB;
