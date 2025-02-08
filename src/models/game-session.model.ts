import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
    players: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, default: 0 }
    }],
    status: { type: String, enum: ['waiting', 'in_progress', 'completed'], default: 'waiting' },
    createdAt: { type: Date, default: Date.now }
  });
  
  export const GameSession = mongoose.model('GameSession', gameSessionSchema);