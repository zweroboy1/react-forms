import * as yup from 'yup';

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
    .matches(/\W/, 'Should contain at least one special character'),

  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords should be the same'),

  gender: yup
    .string()
    .required('Gender is required')
    .test('gender-check', 'We should know your gender', (value) =>
      ['male', 'female'].includes(value)
    ),

  image: yup
    .mixed<FileList>()
    .required('Image is required')
    .test('extension', 'Only PNG or JPEG format', (file) => {
      return (
        !!file?.length && ['image/png', 'image/jpeg'].includes(file[0].type)
      );
    })
    .test('fileSize', 'The image size should be up to 1 MB', (file) => {
      return !!file?.length && file[0].size <= 1048576;
    }),

  country: yup.string().required('Country is required'), // to do

  accept: yup.boolean().oneOf([true], 'You should accept T&C'),
});
