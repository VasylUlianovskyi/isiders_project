import express from 'express';
import { createEvent } from './../controllers/eventsController';

const router = express.Router();

router.post('/', createEvent);
export default router;
