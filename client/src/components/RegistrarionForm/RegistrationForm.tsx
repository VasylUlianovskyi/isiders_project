import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './RegistrationFrom.module.sass';
import { REGISTRATION_VALIDATION_SCHEMA } from '../../utils/validators/REGISTRATION_VALIDATION_SCHEMA';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.registrationContainer}>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={REGISTRATION_VALIDATION_SCHEMA}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const response = await fetch(
              'http://localhost:5000/api/auth/register',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              }
            );

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || 'Registration failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.userId);
            localStorage.setItem('userEmail', data.user.email);

            navigate('/');
          } catch (err: any) {
            console.error('Registration error:', err.message);
            setFieldError('email', err.message);
          } finally {
            setSubmitting(false);
          }
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
