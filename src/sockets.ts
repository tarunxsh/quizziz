import { Server, Socket } from "socket.io";
import { AuthenticatedSocket } from "./middlewares/auth.middleware";
import { getGame, getQuestion } from "./helpers/queries";

const getOpponentSocketId = (game: any, userId:string) => {
  const opponentPlayer =
    game.player1.toString() == userId
      ? game.player2.toString()
      : game.player1.toString();
  return game.session[opponentPlayer];
};

const getWinner = (game:any) => {
  const player1Score = game.session[game.player1].score;
  const player2Score = game.session[game.player2].score;
  if(player1Score > player1Score) return player1Score;
  if(player1Score < player2Score ) return player2Score;
  return null;
};

const checkAnswersReceived = (game: any) => {
  if (game.session[game.player1].attempted + game.session[game.player2].attempted % 2 === 0 )return true;
  return false;
};

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    const startGame = async ({game_id}:any) => {
        const { user_id } = (socket as AuthenticatedSocket).user;
        console.log({game_id, user_id});
        try {
            const game = await getGame({game_id});
            console.log(game);
            if (!game) {
              socket.emit("error", "Game not found");
              return;
            }


            game.session[user_id] = {socket_id: socket.id};
            await game.save();
            socket.join(game_id);

            const opponentPlayerScoket = getOpponentSocketId(game, user_id);

            if (opponentPlayerScoket) {
              const question = await getQuestion({questionNumber: game.currentQuestion});
              io.to(game_id).emit("question:send", {
                question,
              });
            } else {
              socket.emit("waiting", "Waiting for opponent to join");
            }
          } catch (error) {
            socket.disconnect();
          }
    };
    
    const submitAnswer = async ({game_id, question_id, answer}:any) => {
        try {
          const { user_id } = (socket as AuthenticatedSocket).user;
          const game = await getGame({game_id});
          if (!game) {
            socket.emit("error", "Game not found");
            return;
          }

          const question = await getQuestion({question_id});
          if (question?.correctAnswer == answer) {
            game.session[user_id] = {score: (game.session[user_id].score || 0) + 1};
          }

          game.session[user_id].attempted += 1;

          // ensure question is attempted by both the players
          if(checkAnswersReceived(game)){
            game.currentQuestion += 1;
          }
    
          if (game.currentQuestion > game.questions.length) {
            game.status = "completed";
            await game.save();
            io.to(game_id).emit("game:end", {
              winner: getWinner(game),
            });
          } else {
            await game.save();
            const question = await getQuestion(game.currentQuestion);
            io.to(game_id).emit("question:send", {
              question
            });
          }
          } catch (error) {
            console.error("Error processing answer:", error);
          }
    };
    
    const endGame = async (gameId: string) => {
      console.log("Game ended:", gameId);
      socket.disconnect();
    };

    socket.on("game:init", startGame);
    socket.on("answer:submit", submitAnswer);
    socket.on("game:end", endGame);
  });
};



export default socketHandler;
