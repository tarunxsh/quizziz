import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { seedQuestions } from "./seed-questions";

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/quizziz";


export const connectDB = async () => {
    try {
        console.log({db: MONGO_URI});
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
        await seedQuestions();
        console.log("Added Quesrions successfully");

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
  };