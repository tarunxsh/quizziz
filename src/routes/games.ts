import { Router } from "express";
import { start_game } from "../controllers/games.controller";
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();
router.post("/start", authenticate, start_game);
export default router;