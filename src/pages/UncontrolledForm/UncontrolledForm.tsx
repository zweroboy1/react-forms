import React, { FormEvent, useState } from 'react';
import * as yup from 'yup';
import { schema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardData } from '../../types/index';
import { addCard } from '../../store/slices/cardSlice';
import { RootState } from '../../store/store';

interface FormErrors {
  [key: string]: string;
}

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [base64String, setBase64String] = useState<string>('');
  const countriesList = useSelector(
    (state: RootState) => state.countries.countries
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cardData: CardData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password1: formData.get('password1') as string,
      password2: formData.get('password2') as string,
      gender: formData.get('gender') as string,
      image: '',
      country: formData.get('country') as string,
      accept: !!formData.get('accept'),
    };

    const file = formData.get('image') as FileList | null;
    if (file) {
      cardData.image = file;
    }

    setErrors({});
    try {
      await schema.validate(cardData, { abortEarly: false });
      sendCard(cardData);
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        error.inner.reverse().forEach((err) => {
          if (err.path) {
            const pathAsString = String(err.path);
            setErrors((prevErrors) => ({
              ...prevErrors,
              [pathAsString]: err.message,
            }));
          }
        });
      }
    }
  };

  const sendCard = (cardData: CardData) => {
    cardData.image = base64String;
    dispatch(addCard(cardData));
    navigate('/', { state: { success: true } });
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setBase64String(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h2>UncontrolledForm</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <span className="form__error-container">
            <input id="name" name="name" />
            {errors.name && <span className="form__error">{errors.name}</span>}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="age">
            Age
          </label>
          <span className="form__error-container">
            <input id="age" name="age" />
            {errors.age && <span className="form__error">{errors.age}</span>}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <span className="form__error-container">
            <input id="email" name="email" />
            {errors.email && (
              <span className="form__error">{errors.email}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="password1">
            Password
          </label>
          <span className="form__error-container">
            <input id="password1" name="password1" />
            {errors.password1 && (
              <span className="form__error">{errors.password1}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="password2">
            Confirm Password
          </label>
          <span className="form__error-container">
            <input id="password2" name="password2" />
            {errors.password2 && (
              <span className="form__error">{errors.password2}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="gender">
            Gender
          </label>
          <span className="form__error-container">
            <select id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
            {errors.gender && (
              <span className="form__error">{errors.gender}</span>
            )}
          </span>
        </div>

        <div className="form__row">
          <label className="form__label" htmlFor="image">
            Photo
          </label>
          <span className="form__error-container">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileInputChange}
            />
            {errors.image && (
              <span className="form__error">{errors.image}</span>
            )}

            {!errors.image && base64String && (
              <>
                <br />
                <img
                  src={base64String}
                  alt="Uploaded file"
                  style={{ maxWidth: '100px' }}
                />
              </>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="country">
            Country
          </label>
          <span className="form__error-container">
            <input
              id="country"
              name="country"
              className="form__country"
              autoComplete="off"
              list="countriesList"
            />
            {errors.country && (
              <span className="form__error">{errors.country}</span>
            )}

            <datalist id="countriesList">
              {countriesList.map((country) => (
                <option className="form__country-option" key={country}>
                  {country}
                </option>
              ))}
            </datalist>
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="accept">
            Accept T&C
          </label>
          <span className="form__error-container form__error-container">
            <input type="checkbox" id="accept" name="accept" />
            {errors.accept && (
              <span className="form__error form__error_checkbox">
                {errors.accept}
              </span>
            )}
          </span>
        </div>
        <div className="form__row form__button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export { UncontrolledForm };
