import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './LoginForm.module.sass';
import { LOGIN_VALIDATION_SCHEMA } from '../../utils/validators/LOGIN_VALIDATION_SCHEMA';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LOGIN_VALIDATION_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Submitting:', values);
          // TODO: fetch to backend login endpoint
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.loginForm}>
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
              placeholder='Enter your password'
            />
            <ErrorMessage
              name='password'
              component='div'
              className={styles.error}
            />

            <button type='submit' disabled={isSubmitting}>
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
