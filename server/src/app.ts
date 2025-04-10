import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// TODO: додай свої маршрути тут
// app.use('/api/events', eventRoutes);

export default app;
