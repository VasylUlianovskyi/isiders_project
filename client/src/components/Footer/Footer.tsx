import styles from './Footer.module.sass';
function Footer () {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
