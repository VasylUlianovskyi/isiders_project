import * as Yup from 'yup';

export const EVENTS_VALIDATION_SCHEMA = Yup.object({
  eventName: Yup.string()
    .required('Event name is required')
    .min(2, 'Event name must be at least 2 characters'),

  eventDate: Yup.date()
    .required('Date and time are required')
    .min(new Date(), 'Event date cannot be in the past'),

  reminderTime: Yup.number()
    .required('Reminder time is required')
    .min(1, 'Reminder must be at least 1 minute'),

  description: Yup.string().max(
    500,
    'Description cannot exceed 500 characters'
  ),

  importance: Yup.string()
    .oneOf(['normal', 'important', 'critical'], 'Invalid importance level')
    .required('Event importance is required'),
});
