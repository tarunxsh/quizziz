# Quizziz 
A Real-time quiz game where two players compete against each other. Each player is presented with the same 4 questions in sequence, and they answer these questions independently. The player who scores the highest out of the 4 questions wins the game.

# Tech Stack
- **Backend**: Node.js Express
- **Database**: MongoDB
- **Real-Time Communication**: WebSockets
- **Authentication**: JWT for user authentication


# Requirements
1. **User Authentication**:
    - [x] Implement endpoints for user registration and login
    - [x] Securely hash passwords before storing them in MongoDB
2. **Game Session Setup:**
    - [x] Create an endpoint to start a new game session and match two players
    - [x] Once matched, initiate a game session and notify both players using socket [**`game:init`**]
3. **Question Management**:
    - [x] Pre-store a set of 4 questions in MongoDB. Each question should have a question text, multiple choices, and a correct answer
4. **Real-Time Question Delivery**:
    - [x] Use socket to send questions to each player as soon as they are ready to receive the next question [`question:send`]
5. **Answer Submission and Scoring**:
    - [x] Allow players to submit their answers through socket [`answer:submit`]
6. **Result Calculation**:
    - [x] At the end of the 4 questions, calculate the final scores and determine the winner
    - [] Send the result to both players and store the session results in MongoDB. [`game:end`]
7. **API Endpoints**:
    - [x] **`POST /register`**: Registers a new user.
    - [x] **`POST /login`**: Authenticates a user.
    - [x] **`POST /game/start`**: Starts a new game session. 