import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password is required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'User already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      message: 'Register is  successfu',
      user: { email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Enter email and password' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user!.password);
    if (!match) {
      res.status(401).json({ error: 'Wrong email or password' });
    }

    const token = jwt.sign(
      { userId: user!.id, email: user!.email },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      message: 'Login success',
      token,
      user: { id: user!.id, email: user!.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
