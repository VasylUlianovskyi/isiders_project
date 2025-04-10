import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './EventsForm.module.sass';
import { EVENTS_VALIDATION_SCHEMA } from '../../../utils/validators/EVENTS_VALIDATION_SCHEMA';

const EventForm = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Formik
      initialValues={{
        eventName: '',
        eventDate: '',
        reminderTime: 10,
        description: '',
        importance: 'normal',
      }}
      validationSchema={EVENTS_VALIDATION_SCHEMA}
      onSubmit={(values, { resetForm }) => {
        const newTimer = {
          id: Date.now(),
          name: values.eventName,
          date: new Date(values.eventDate).toISOString(),
          reminder: values.reminderTime,
          description: values.description,
          importance: values.importance,
          createdAt: new Date().toISOString(),
          status: 'active',
        };

        console.log('Created Event:', newTimer);
        resetForm();
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.eventForm}>
          <label>Event:</label>
          <Field type='text' name='eventName' placeholder='Event name' />
          <ErrorMessage
            name='eventName'
            component='div'
            className={styles.error}
          />

          <label>Description:</label>
          <Field
            as='textarea'
            name='description'
            placeholder='Enter description...'
          />
          <ErrorMessage
            name='description'
            component='div'
            className={styles.error}
          />

          <label>Importance:</label>
          <Field as='select' name='importance'>
            <option value='normal'>Normal</option>
            <option value='important'>Important</option>
            <option value='critical'>Critical</option>
          </Field>
          <ErrorMessage
            name='importance'
            component='div'
            className={styles.error}
          />

          <label>Date and Time:</label>
          <Field type='datetime-local' name='eventDate' />
          <ErrorMessage
            name='eventDate'
            component='div'
            className={styles.error}
          />

          <label>Remind in ... minutes:</label>
          <Field type='number' name='reminderTime' min='10' />
          <ErrorMessage
            name='reminderTime'
            component='div'
            className={styles.error}
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className={isClicked ? styles.active : ''}
          >
            Add Event
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
