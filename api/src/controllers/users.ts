import { getUserById } from "../db/users";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.MONGO_URL) as { userId: string };
    const user = await getUserById(decoded.userId)

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}