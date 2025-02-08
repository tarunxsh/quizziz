import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUser, createUser } from "../helpers/queries";

type AccessTokenParams = {
    username: string;
    user_id: number;
};

export const BLACKLISTED_TOKENS = new Set<string>();

function generateAccessToken({ user_id, username }: AccessTokenParams) {
    const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
    return jwt.sign({ user_id, username }, SECRET_KEY, { expiresIn: "1h" });
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await getUser({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to DB
        const user = await createUser({ username, email, password: hashedPassword });
        console.log(user)
        res.status(201).json({ username, email });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;
    const user  = await getUser({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token  = generateAccessToken({ user_id: user.id, username: user.username });
    res.json({ token });
};

export const logout = (req: Request, res: Response) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (token) BLACKLISTED_TOKENS.add(token);
    res.json({ message: "Logged out successfully" });
};