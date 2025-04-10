import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.sass';

export default function Navbar () {
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
      </NavLink>
      <NavLink to='/form' className={styles.link}>
        New Event
      </NavLink>
    </nav>
  );
}
