import mongoose from "mongoose";
import { config } from "../config";

export class DBConnect {
  public static async connect() {
    try {
      await mongoose.connect(config.MONGODB_URI);
      console.log("Database connected successfully 👍👍");
    } catch (error) {
      console.error(error);
    }
  }
}

