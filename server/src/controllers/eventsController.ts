import { Request, Response } from 'express';
import { RequestHandler } from 'express';
export const createEvent: RequestHandler = (req: Request, res: Response) => {
  console.log('Event received:', req.body);
  res.json({ message: 'Event created successfully (насправді ні)' });
};
