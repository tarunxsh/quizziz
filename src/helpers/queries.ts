import user from '../models/user.model';
import Questions from '../models/question.model';
import Game from '../models/game.model';

export const getUser = async ({username}: any) => {
    return await user.findOne({ username });
}

export const createUser = async ({username, email, password}: any) => {
    return await user.create({ username, email, password });
}

export const getGame = async ({game_id}: any) => {
    return Game.findOne({
        _id: game_id
    });
}

export const getQuestion = async ({questionNumber, question_id}: any) => {
  const question = await Questions.findOne({
      ...(questionNumber && { questionNumber }),
      ...(question_id && { _id: question_id }),
    }
  );
  return question || null;
};