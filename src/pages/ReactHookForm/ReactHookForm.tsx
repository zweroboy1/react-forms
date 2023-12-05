import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardData } from '../../types';
import { schema } from '../../utils/validationSchema';
import { addCard } from '../../store/slices/cardSlice';
import { RootState } from '../../store/store';
import { PasswordStrength } from '../../components/PasswordStrength/PasswordStrength';

const ReactHookForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const [countryOptions, setCountryOptions] = useState<string[]>();
  const [currentPassword, setCurrentPassword] = useState<string>('');

  const countriesList = useSelector(
    (state: RootState) => state.countries.countries
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<CardData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const selectedPassword1 = watch('password1');
  const selectedPassword2 = watch('password2');
  const selectedCountry = watch('country');
  const selectedFile = watch('image');

  useEffect(() => {
    const searchCountry = () => {
      setCountryOptions(
        countriesList.filter((country) =>
          country.toLowerCase().startsWith(selectedCountry.trim().toLowerCase())
        )
      );
      if (countriesList.includes(selectedCountry)) {
        setCountryOptions([]);
        trigger('country');
      }
    };
    if (selectedCountry) {
      searchCountry();
    }
  }, [selectedCountry, countriesList, setValue, trigger]);

  useEffect(() => {
    if (
      selectedFile &&
      typeof selectedFile !== 'string' &&
      selectedFile instanceof FileList &&
      selectedFile.length > 0
    ) {
      const file = selectedFile?.[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      trigger('image');
    }
  }, [selectedFile, trigger]);

  useEffect(() => {
    if (selectedPassword2) {
      trigger('password1');
    }
  }, [selectedPassword2, trigger]);

  useEffect(() => {
    if (selectedPassword1) {
      trigger('password2');
    }
    setCurrentPassword(selectedPassword1);
  }, [selectedPassword1, trigger]);

  const onSubmit = (data: CardData) => {
    const newData = { ...data };
    if (typeof selectedImage === 'string') {
      newData.image = selectedImage;
    }

    dispatch(addCard(newData));
    navigate('/', { state: { success: true } });
  };

  return (
    <>
      <h2>ReactHookForm</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__row">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <span className="form__error-container">
            <input id="name" {...register('name')} />
            {errors.name && (
              <span className="form__error">{errors.name.message}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="age">
            Age
          </label>
          <span className="form__error-container">
            <input id="age" {...register('age')} />
            {errors.age && (
              <span className="form__error">{errors.age.message}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <span className="form__error-container">
            <input id="email" {...register('email')} />
            {errors.email && (
              <span className="form__error">{errors.email.message}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="password1">
            Password
          </label>
          <span className="form__error-container">
            <input id="password1" {...register('password1')} />
            {errors.password1 && (
              <span className="form__error">{errors.password1.message}</span>
            )}
            <span className="form__indicator">
              <PasswordStrength password={currentPassword} />
            </span>
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="password2">
            Confirm Password
          </label>
          <span className="form__error-container">
            <input id="password2" {...register('password2')} />
            {errors.password2 && (
              <span className="form__error">{errors.password2.message}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="gender">
            Gender
          </label>
          <span className="form__error-container">
            <select id="gender" {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
            {errors.gender && (
              <span className="form__error">{errors.gender.message}</span>
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
              {...register('image')}
              multiple={false}
            />
            {errors.image && (
              <span className="form__error">{errors.image.message}</span>
            )}

            {!errors.image &&
              selectedImage &&
              typeof selectedImage === 'string' && (
                <>
                  <br />
                  <img
                    src={selectedImage}
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
              {...register('country')}
              className="form__country"
              autoComplete="off"
            />
            {errors.country && (
              <span className="form__error">{errors.country.message}</span>
            )}
            {
              <ul className="form__country-list">
                {countryOptions?.map((country) => (
                  <li
                    className="form__country-option"
                    key={country}
                    onClick={() => setValue('country', country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            }
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="accept">
            Accept T&C
          </label>
          <span className="form__error-container form__error-container">
            <input type="checkbox" id="accept" {...register('accept')} />
            {errors.accept && (
              <span className="form__error form__error_checkbox">
                {errors.accept.message}
              </span>
            )}
          </span>
        </div>
        <div className="form__row form__button">
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export { ReactHookForm };
