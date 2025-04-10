import express from 'express';
import { createEvent, getEvents } from './../controllers/eventsController';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);

export default router;
