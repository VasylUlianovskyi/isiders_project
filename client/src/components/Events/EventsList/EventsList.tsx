import { useEffect, useState } from 'react';
import EventEditForm from './../EventEditForm/EventEditForm';
import styles from './EventsList.module.sass';

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

  const fetchEvents = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/events?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch events');
      }

      setEvents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (id: number) => {
    setEditingEventId(id);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete event');
      }

      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
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
