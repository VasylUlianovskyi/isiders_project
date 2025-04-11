const EVENTS_API_URL = 'http://localhost:5000/api/events';

export const fetchUserEvents = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${EVENTS_API_URL}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Failed to fetch events');

    return data;
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
};

export const updateEvent = async (
  eventId: number,
  updatedData: Partial<EventItem>
): Promise<EventItem> => {
  const res = await fetch(`${EVENTS_API_URL}/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to update event');
  }

  return data;
};

export const createEvent = async (payload: any) => {
  const res = await fetch(`${EVENTS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Event creation failed');
  }

  return data;
};

export const fetchEvents = async (): Promise<EventItem[]> => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    throw new Error('Unauthorized');
  }

  const res = await fetch(`${EVENTS_API_URL}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch events');
  }

  return data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${EVENTS_API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to delete event');
  }
};
