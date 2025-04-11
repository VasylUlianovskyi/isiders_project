import { useState, useEffect } from 'react';
import styles from './EventEditForm.module.sass';
import { updateEvent } from '../../../services/eventsServices';
import { UPDATE_EVENTS_VALIDATION_SCHEMA } from '../../../utils/validators/UPDATE_EVENTS_VALIDATION_SCHEMA';

interface EventItem {
  id: number;
  name: string;
  date: string;
  reminder: number;
  description: string;
  importance: string;
  status: string;
  userId: number;
}

interface Props {
  event: EventItem;
  onCancel: () => void;
  onUpdate: (updated: EventItem) => void;
}

const EventEditForm: React.FC<Props> = ({ event, onCancel, onUpdate }) => {
  const [eventData, setEventData] = useState({
    name: event.name,
    date: new Date(event.date).toISOString().slice(0, 16),
    reminder: event.reminder,
    description: event.description,
    importance: event.importance,
    status: event.status,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await UPDATE_EVENTS_VALIDATION_SCHEMA.validate(eventData, {
        abortEarly: false,
      });

      const updatedEvent = {
        ...event,
        ...eventData,
      };

      const data = await updateEvent(event.id, updatedEvent);
      onUpdate(data);
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        console.error('Validation errors:', err.errors);
      } else {
        console.error('Update error:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <label>
        Event Name
        <input
          type='text'
          name='name'
          value={eventData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name='description'
          value={eventData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Date
        <input
          type='datetime-local'
          name='date'
          value={eventData.date}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Remind (minutes)
        <input
          type='number'
          name='reminder'
          value={eventData.reminder}
          onChange={handleChange}
          min='1'
        />
      </label>

      <label>
        Priority
        <select
          name='importance'
          value={eventData.importance}
          onChange={handleChange}
        >
          <option value='normal'>Normal</option>
          <option value='important'>Important</option>
          <option value='critical'>Critical</option>
        </select>
      </label>

      <label>
        Status
        <select name='status' value={eventData.status} onChange={handleChange}>
          <option value='active'>Active</option>
          <option value='completed'>Completed</option>
          <option value='cancelled'>Cancelled</option>
        </select>
      </label>

      <div className={styles.buttonGroup}>
        <button type='submit'>Update event</button>
        <button
          type='button'
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventEditForm;
