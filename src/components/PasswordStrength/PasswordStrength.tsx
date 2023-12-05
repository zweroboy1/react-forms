import * as yup from 'yup';
import React from 'react';
import { passwordSchema } from '../../utils/passwordSchema';

type PasswordStrengthProps = { password: string };

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const evaluatePassword = (password: string): number => {
    if (!password) {
      return 0;
    }
    let strength = 10;
    try {
      passwordSchema.validateSync(password, { abortEarly: false });
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        strength = 10 - error.inner.length;
      }
    }
    return strength;
  };

  const strength = evaluatePassword(password);
  const names = [
    'Weak',
    'Weak',
    'Weak',
    'Moderate',
    'Moderate',
    'Good',
    'Good',
    'Good',
    'Strong',
    'Strong',
    'Excellent',
  ];
  const colors = [
    '#fdc4c4',
    '#fdc4c4',
    '#fdc4c4',
    '#ffffb3',
    '#ffffb3',
    '#c0fec1',
    '#c0fec1',
    '#c0fec1',
    '#a0fea1',
    '#a0fea1',
    '#a0fea1',
  ];

  return (
    <span className="password-strength">
      <span className="password-strength__text">
        Password Strength: {names[strength]}
      </span>
      <span
        className="password-strength__line"
        style={{
          width: `${10 * strength}%`,
          backgroundColor: colors[strength],
        }}
      ></span>
    </span>
  );
};

export { PasswordStrength };
