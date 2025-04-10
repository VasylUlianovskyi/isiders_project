import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

import { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('API is alive');
});

app.use('/api/auth', authRoutes);

export default app;
