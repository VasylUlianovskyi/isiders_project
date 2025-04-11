import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './LoginForm.module.sass';
import { LOGIN_VALIDATION_SCHEMA } from '../../utils/validators/LOGIN_VALIDATION_SCHEMA';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

interface Props {
  onLoginSuccess: (email: string) => void;
}

const Login = ({ onLoginSuccess }: Props) => {
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await loginUser(values);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user.userId);
      localStorage.setItem('userEmail', response.user.email);

      onLoginSuccess(response.user.email);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LOGIN_VALIDATION_SCHEMA}
        onSubmit={handleLogin}
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
