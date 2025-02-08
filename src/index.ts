import dotenv from "dotenv";
dotenv.config();
import 'reflect-metadata';
import express from "express";
import userRoutes from "./routes/users";
import gameRoutes from "./routes/games";
import { initDb } from "./config/db";



const app = express();
app.use(express.json());
initDb();

const router = express.Router();
router.use("/users", userRoutes);
router.use("/game", gameRoutes);
app.use("/api/v1", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));