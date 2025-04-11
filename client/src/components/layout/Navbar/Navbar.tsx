import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Navbar.module.sass';
import { fetchEvents } from '../../../services/eventsServices';

export default function Navbar () {
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const updateBadge = async () => {
      try {
        const events = await fetchEvents();
        const now = new Date().getTime();

        const count = events.filter((event: any) => {
          const eventTime = new Date(event.date).getTime();
          const minutesLeft = (eventTime - now) / 60000;
          return minutesLeft <= event.reminder;
        }).length;

        setAlertCount(count);
      } catch (err) {
        console.error('Failed to update badge:', err);
      }
    };

    updateBadge();
    const interval = setInterval(updateBadge, 1000);
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
