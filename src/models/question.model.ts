import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    choices: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    questionNumber: { type: Number,required: true, default: 1 },
});
  
const Question = mongoose.model('Question', questionSchema);
export default Question;