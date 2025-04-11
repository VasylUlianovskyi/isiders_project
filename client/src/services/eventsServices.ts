const EVENTS_API_URL = 'http://localhost:5000/api/events';

export const fetchUserEvents = async (userId: string, token: string) => {
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

    if (!res.ok) throw new Error(data.error || 'Failed to fetch events');

    return data;
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
};
