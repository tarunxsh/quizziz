import { Router } from "express";
import { start_game } from "../controllers/games.controller";

const router = Router();
router.post("/start", start_game);
export default router;