import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Registration.module.sass';
import { REGISTRATION_VALIDATION_SCHEMA } from '../../utils/validators/REGISTRATION_VALIDATION_SCHEMA';

const Registration = () => {
  return (
    <div className={styles.registrationContainer}>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={REGISTRATION_VALIDATION_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Registering:', values);
          // TODO: Send to backend /api/auth/register
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.registrationForm}>
            <label>Email</label>
            <Field type='email' name='email' placeholder='Enter your email' />
            <ErrorMessage
              name='email'
              component='div'
              className={styles.error}
            />

            <label>Password</label>
            <Field
              type='password'
              name='password'
              placeholder='Enter password'
            />
            <ErrorMessage
              name='password'
              component='div'
              className={styles.error}
            />

            <label>Confirm Password</label>
            <Field
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
            />
            <ErrorMessage
              name='confirmPassword'
              component='div'
              className={styles.error}
            />

            <button type='submit' disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
