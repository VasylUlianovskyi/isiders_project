import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('API is alive');
});

export default app;
