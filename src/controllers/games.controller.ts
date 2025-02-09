import { Request, Response } from "express";
import { AuthencatedRequest } from "../middlewares/auth.middleware";
import Game from "../models/game.model";
import Question from "../models/question.model";


// create a new game session or join an existing one
export const start_game = async (req: Request, res: Response) => {
    try {
        const { user_id } = (req as AuthencatedRequest).user;

        const questions = await Question.aggregate([{ $sample: { size: 4 } }]);
        const game = new Game({
          player1: user_id,
          questions: questions.map(q => q._id)
        });
    
        await game.save();
        res.json({
            status: 200,
            data: game
        });
      } catch (error) {
        res.status(400).json({ error: 'Failed to start game' });
      }
}