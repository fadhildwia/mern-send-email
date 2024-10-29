import { createUser, createUserActivity, getUserByEmail, getUserById } from '../db/users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    user.loginTimestamp = new Date();
    await user.save();
    await createUserActivity({
      userId: user._id,
      loginTimestamp: user.loginTimestamp
    }) 

    const token = jwt.sign({ userId: user._id, loginTimestamp: user.loginTimestamp }, process.env.MONGO_URL);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.MONGO_URL) as { userId: string };
    const user = await getUserById(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    user.logoutTimestamp = new Date();
    await user.save();
    await createUserActivity({
      userId: user._id,
      logoutTimestamp: user.logoutTimestamp
    }) 

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}