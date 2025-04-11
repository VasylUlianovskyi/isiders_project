import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { parse, startOfWeek, format, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './CalendarView.module.sass';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [importanceFilter, setImportanceFilter] = useState('all');
  const [keyword, setKeyword] = useState('');

  const fetchEvents = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const res = await fetch(
      `http://localhost:5000/api/events?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesImportance =
      importanceFilter === 'all' || event.importance === importanceFilter;

    const matchesKeyword =
      event.name.toLowerCase().includes(keyword.toLowerCase()) ||
      event.description.toLowerCase().includes(keyword.toLowerCase());

    return matchesImportance && matchesKeyword;
  });

  const calendarEvents = filteredEvents.map(event => ({
    title: event.name,
    start: new Date(event.date),
    end: new Date(event.date),
    importance: event.importance,
  }));

  return (
    <div className={styles.calendarView}>
      <div className={styles.controls}>
        <input
          type='text'
          placeholder='Search events...'
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <select
          value={importanceFilter}
          onChange={e => setImportanceFilter(e.target.value)}
        >
          <option value='all'>All</option>
          <option value='normal'>Normal</option>
          <option value='important'>Important</option>
          <option value='critical'>Critical</option>
        </select>
        <button onClick={() => setViewMode('calendar')}>Calendar</button>
        <button onClick={() => setViewMode('list')}>List</button>
      </div>

      {viewMode === 'calendar' ? (
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          eventPropGetter={event => {
            let backgroundColor = '#ccc';

            switch (event.importance) {
              case 'normal':
                backgroundColor = '#999';
                break;
              case 'important':
                backgroundColor = '#fca311';
                break;
              case 'critical':
                backgroundColor = '#e63946';
                break;
            }

            return {
              style: {
                backgroundColor,
                borderRadius: '6px',
                color: '#fff',
                border: 'none',
                padding: '2px 4px',
              },
            };
          }}
        />
      ) : (
        <ul className={styles.listView}>
          {filteredEvents.map(event => (
            <li
              key={event.id}
              className={`${styles.eventItem} ${styles[event.importance]}`}
            >
              <div
                className={`${styles.importanceTag} ${
                  styles[event.importance]
                }`}
              >
                {event.importance}
              </div>
              <h3 className={styles.eventTitle}>{event.name}</h3>
              <p className={styles.eventDate}>
                {new Date(event.date).toLocaleString()}
              </p>
              <p className={styles.eventDescription}>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarView;
