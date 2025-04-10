import * as Yup from 'yup';

export const REGISTRATION_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Too short - should be 6 chars minimum.')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});
