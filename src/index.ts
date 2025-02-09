import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRoutes from "./routes/users";
import gameRoutes from "./routes/games";
import { connectDB } from "./config/db";
import { authenticateSocket } from "./middlewares/auth.middleware";
import socketHnadler from "./sockets";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.use(authenticateSocket);
socketHnadler(io);

app.use(express.json());

const router = express.Router();
router.use("/users", userRoutes);
router.use("/game", gameRoutes);
app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
