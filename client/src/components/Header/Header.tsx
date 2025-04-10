import { Link } from 'react-router-dom';
import styles from './Header.module.sass';

function Header ({ isLoggedIn, userEmail, onLogout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      {!isLoggedIn ? (
        <nav className={styles.nav}>
          <Link to='/login' className={styles.link}>
            Login
          </Link>
          <Link to='/registration' className={styles.link}>
            Registration
          </Link>
        </nav>
      ) : (
        <>
          <span>Hello, {userEmail}</span>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </header>
  );
}

export default Header;
