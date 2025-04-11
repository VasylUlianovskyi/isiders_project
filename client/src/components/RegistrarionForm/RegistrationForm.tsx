import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import styles from './RegistrationFrom.module.sass';
import { REGISTRATION_VALIDATION_SCHEMA } from '../../utils/validators/REGISTRATION_VALIDATION_SCHEMA';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const Registration = () => {
  const navigate = useNavigate();

  const handleRegistration = async (
    values: RegistrationFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<RegistrationFormValues>
  ) => {
    try {
      const data = await registerUser({
        email: values.email,
        password: values.password,
      });

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
  };

  return (
    <div className={styles.registrationContainer}>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={REGISTRATION_VALIDATION_SCHEMA}
        onSubmit={handleRegistration}
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
