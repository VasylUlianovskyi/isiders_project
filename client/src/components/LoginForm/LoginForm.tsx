import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './LoginForm.module.sass';
import { LOGIN_VALIDATION_SCHEMA } from '../../utils/validators/LOGIN_VALIDATION_SCHEMA';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLoginSuccess: (email: string) => void;
}

const Login = ({ onLoginSuccess }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LOGIN_VALIDATION_SCHEMA}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
              throw new Error(data.error || 'Login failed');
            }
            localStorage.setItem('userId', String(data.user.id));
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', data.user.email);
            onLoginSuccess(data.user.email);
            navigate('/');
          } catch (err: any) {
            console.error('Login error:', err.message);
            setFieldError('password', err.message);
          } finally {
            setSubmitting(false);
          }
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
