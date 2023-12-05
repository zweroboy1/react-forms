import * as yup from 'yup';
export const passwordSchema = yup
  .string()
  .matches(/[A-ZА-ЯЇЁ]/)
  .matches(/[0-9]/)
  .matches(/[a-zа-яъїыё]/)
  .matches(/\W/)
  .matches(/\W\W/)
  .matches(/\d\d/)
  .matches(/\s/)
  .matches(/[A-ZА-ЯЇЁ]{3}/)
  .matches(/[a-zа-яъїыё]{3}/)
  .min(9);
