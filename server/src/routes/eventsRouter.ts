import express from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from './../controllers/eventsController';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
export default router;
