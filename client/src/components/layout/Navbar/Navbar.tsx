import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Navbar.module.sass';

export default function Navbar () {
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) return;

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
        const now = new Date().getTime();

        const count = data.filter((event: any) => {
          const eventTime = new Date(event.date).getTime();
          const minutesLeft = (eventTime - now) / 60000;
          return minutesLeft <= event.reminder;
        }).length;

        setAlertCount(count);
      } catch (err) {
        console.error('Failed to fetch events for badge', err);
      }
    };

    fetchEvents();

    const interval = setInterval(fetchEvents, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={styles.navbar}>
      <NavLink to='/' className={styles.link}>
        Home
      </NavLink>
      <NavLink to='/calendar' className={styles.link}>
        Calendar
      </NavLink>
      <NavLink to='/events' className={styles.link}>
        Events
        {alertCount > 0 && <span className={styles.badge}>{alertCount}</span>}
      </NavLink>
      <NavLink to='/form' className={styles.link}>
        New Event
      </NavLink>
    </nav>
  );
}
