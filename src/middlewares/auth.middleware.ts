import { Request, Response, NextFunction } from "express";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { BLACKLISTED_TOKENS } from "../controllers/users.controller";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export interface User {
    user_id: string;
    username: string;
    email: string;
}

export interface AuthencatedRequest extends Request {
    user: User;
}

export interface AuthenticatedSocket extends Socket {
    user: User;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log({token: req.header("Authorization")})
    if (!token || BLACKLISTED_TOKENS.has(token)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as User;
        (req as AuthencatedRequest).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export const authenticateSocket = async (socket:Socket, next:any) => {
    console.log("Authenticating socket");
    if (socket.handshake.headers && socket.handshake.headers.authorization) {
        const token = socket.handshake.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, SECRET_KEY) as User;
        if (user) {
          (socket as AuthenticatedSocket).user = user;
          next();
        }
      } else {
        socket.emit("game:register", { status: 404, errors: "Token Not Valid" });
        next(new Error("Token Not Valid" ));
      }
}