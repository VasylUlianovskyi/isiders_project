import styles from './NotFound.module.sass';
import { Link } from 'react-router-dom';

export default function NotFound () {
  return (
    <div className={styles.notFound}>
      <h1>404 — Page not exist</h1>

      <Link to='/' className={styles.notFoundLink}>
        Go to Home Page
      </Link>
    </div>
  );
}
