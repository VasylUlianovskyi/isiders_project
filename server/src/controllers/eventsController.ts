import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import Event from '../models/Events';
export const createEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, date, reminder, description, importance, status, userId } =
      req.body;

    if (!name || !date || !reminder || !importance || !userId) {
      res.status(400).json({ error: 'Missing required event fields' });
    }

    const newEvent = await Event.create({
      name,
      date,
      reminder,
      description,
      importance,
      status: status || 'active',
      userId,
    });

    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    console.error('createEvent error:', error);
    res
      .status(500)
      .json({ error: 'Internal server error, because of course it is' });
  }
};
