import { Question } from "../models/question.model"

export const seedQuestions = async () => {
    const questions = [
        {
          text: "What is the capital of France?",
          choices: ["London", "Paris", "Berlin", "Madrid"],
          correctAnswer: 1
        },
        {
          text: "What is 2 + 2?",
          choices: ["3", "4", "5", "6"],
          correctAnswer: 1
        },
        {
          text: "Who painted the Mona Lisa?",
          choices: ["Van Gogh", "Da Vinci", "Picasso", "Monet"],
          correctAnswer: 1
        },
        {
          text: "What planet is closest to the Sun?",
          choices: ["Venus", "Mars", "Mercury", "Earth"],
          correctAnswer: 2
        }
      ]

      await Question.deleteMany();  // delete existing questions
      return Question.insertMany(questions);
}