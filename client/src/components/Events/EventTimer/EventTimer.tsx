import { useEffect, useState } from 'react';
import { getRemainingTime } from '../../../utils/timer';
import styles from './EventsTimer.module.sass';

const EventTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTime(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className={styles.expired}> Time's up </div>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className={styles.timer}>
      {days > 0 && <span>{days}d </span>}
      {hours > 0 && <span>{hours}h </span>}
      {minutes > 0 && <span>{minutes}m </span>}
      <span>{seconds}s</span>
    </div>
  );
};

export default EventTimer;
