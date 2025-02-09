import mongoose from 'mongoose';


const gameSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    status: { type: String, enum: ['waiting', 'in_progress', 'completed'], default: 'waiting' },
    currentQuestion: { type: Number, default: 1 },
    session: { type: mongoose.Schema.Types.Mixed, default: {} },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    createdAt: { type: Date, default: Date.now }
  });
  
const Game = mongoose.model('Game', gameSchema);
export default Game;