import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./routes/users";
import gameRoutes from "./routes/games";
import { connectDB } from "./config/db";

const app = express();
app.use(express.json());


const router = express.Router();
router.use("/users", userRoutes);
router.use("/game", gameRoutes);
app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
