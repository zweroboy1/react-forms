import * as yup from 'yup';
import { store } from '../store/store';

const countries = store.getState().countries.countries;

const emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\.\-]+$/;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-ZА-ЯЇЁ].*$/, 'First letter should be uppercased')
    .matches(/^[A-ZА-ЯЇЁА-Яa-zа-яъїыё\-\. ]*$/, 'Only letters are allowed'),

  age: yup
    .number()
    .required('Age is required')
    .typeError('Age should be a number')
    .positive('Age should be a positive number')
    .integer('Age should be an integer')
    .test(
      'old-age',
      'You are too old for our site',
      (value) => Number(value) < 200
    ),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(emailRegex, 'Invalid email'),

  password1: yup
    .string()
    .required('Password is required')
    .matches(/[0-9]/, 'Should contain at least one number')
    .matches(/[A-ZА-ЯЇЁ]/, 'Should contain at least one uppercase character')
    .matches(/[a-zа-яъїыё]/, 'Should contain at least one lowercase character')
    .matches(
      /[!@#$%^&*()_+={[}\]:;"'<,>.?/~\\|]/,
      'Should contain at least one special character'
    ),

  password2: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password1')], 'Passwords should be the same'),

  gender: yup
    .string()
    .required('Gender is required')
    .test('gender-check', 'We should know your gender', (value) =>
      ['male', 'female'].includes(value)
    ),

  image: yup
    .mixed<FileList | File | string>()
    .required('Image is required')
    .test('extension', 'Only PNG or JPEG format', (file) => {
      if (file instanceof FileList) {
        if (file.length === 0) {
          return false;
        }
        file = file[0];
      }
      return (
        typeof file !== 'string' &&
        ['image/png', 'image/jpeg'].includes(file.type)
      );
    })
    .test('fileSize', 'The image size should be up to 1 MB', (file) => {
      if (file instanceof FileList) {
        if (file.length === 0) {
          return false;
        }
        file = file[0];
      }
      return typeof file !== 'string' && file.size <= 1048576;
    }),

  country: yup
    .string()
    .required('Country is required')
    .test('valid-country', 'Invalid country', (value) => {
      return countries.includes(value);
    }),

  accept: yup
    .boolean()
    .required('You should accept T&C')
    .oneOf([true], 'You should accept T&C'),
});
