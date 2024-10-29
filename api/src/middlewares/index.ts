import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    if (!token) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    return next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}