import { useEffect, useState } from 'react';
import EventEditForm from './../EventEditForm/EventEditForm';
import styles from './EventsList.module.sass';
import EventTimer from '../EventTimer/EventTimer';
import { fetchEvents, deleteEvent } from '../../../services/eventsServices';

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

const EventsList = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id: number) => {
    setEditingEventId(id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err: any) {
      console.error('Delete failed:', err.message);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.eventsListContainer}>
      <h2>Your Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className={styles.eventList}>
          {events.map(event => (
            <li key={event.id} className={styles.eventItem}>
              <div className={styles.eventInfo}>
                <h3>{event.name}</h3>
                <p>
                  <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                </p>
                <p>
                  <strong>Importance:</strong> {event.importance}
                </p>
                <p>{event.description}</p>
              </div>
              <EventTimer targetDate={event.date} />

              <div className={styles.actions}>
                <button onClick={() => handleEdit(event.id)}>Update</button>

                <button
                  onClick={() => handleDelete(event.id)}
                  className={styles.delete}
                >
                  Delete
                </button>
              </div>
              {editingEventId === event.id && (
                <EventEditForm
                  event={event}
                  onCancel={() => setEditingEventId(null)}
                  onUpdate={updatedEvent => {
                    setEvents(prev =>
                      prev.map(e =>
                        e.id === updatedEvent.id ? updatedEvent : e
                      )
                    );
                    setEditingEventId(null);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventsList;
