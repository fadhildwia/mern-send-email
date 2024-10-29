import { createUser, getUserByEmail } from '../db/users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email & password required!' });
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await createUser({
      email,
      password: hashedPassword
    })

    return res.status(200).json(newUser).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}