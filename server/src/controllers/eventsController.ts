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
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.query.userId);

    if (!userId || isNaN(userId)) {
      res.status(400).json({ error: 'userId is required in query params' });
    }

    const events = await Event.findAll({
      where: { userId },
      order: [['date', 'ASC']],
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('getEvents error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, date, reminder, description, importance, status } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
    }

    event!.name = name || event!.name;
    event!.date = date ? new Date(date) : event!.date;
    event!.reminder = reminder ?? event!.reminder;
    event!.description = description || event!.description;
    event!.importance = importance || event!.importance;
    event!.status = status || event!.status;

    await event!.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при оновленні події', error });
  }
};

export const deleteEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      res.status(404).json({ error: 'Event not found' });
    }

    await event!.destroy();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
