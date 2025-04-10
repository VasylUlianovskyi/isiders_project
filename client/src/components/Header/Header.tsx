import { Link } from 'react-router-dom';
import styles from './Header.module.sass';

function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      <nav className={styles.nav}>
        <Link to='/login' className={styles.link}>
          Login
        </Link>
        <Link to='/registration' className={styles.link}>
          Registration
        </Link>
      </nav>
    </header>
  );
}

export default Header;
