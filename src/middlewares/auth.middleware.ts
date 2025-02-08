import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BLACKLISTED_TOKENS } from "../controllers/users.controller";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export interface AuthencatedRequest extends Request {
    user: string | JwtPayload;
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token || BLACKLISTED_TOKENS.has(token)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as AuthencatedRequest).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};


export default authenticate;