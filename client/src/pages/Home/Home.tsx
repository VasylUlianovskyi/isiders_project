import styles from './Home.module.sass';
function Home () {
  return (
    <section className={styles.home}>
      <h1 className={styles.homeTitle}>Welcome to MyApp</h1>
      <p className={styles.homeSubtitle}>
        Plan your events. Stay organized. Be less chaotic.
      </p>
    </section>
  );
}
export default Home;
