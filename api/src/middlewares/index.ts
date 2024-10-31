import { getUserById } from '../db/users';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    if (!token) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const decoded = jwt.verify(token, process.env.MONGO_URL) as { userId: string };
    const user = await getUserById(decoded.userId)

    if (user.token !== token) {
      return res.status(403).json({ error: 'Invalid Token' })
    }

    return next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}