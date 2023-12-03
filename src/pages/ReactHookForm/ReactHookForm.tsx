import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../../types';
import { schema } from '../../utils/validationSchema';
import { addCard } from '../../store/slices/cardSlice';

const ReactHookForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const newData = { ...data };
    if (typeof selectedImage === 'string') {
      newData.image = selectedImage;
    }
    dispatch(addCard(newData));
    navigate('/');
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
            <select {...register('gender')}>
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
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="form__error">{errors.image.message}</span>
            )}

            {selectedImage && typeof selectedImage === 'string' && (
              <>
                <br />
                <img
                  src={selectedImage}
                  alt="Selected"
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
            <input id="country" {...register('country')} />
            {errors.country && (
              <span className="form__error">{errors.country.message}</span>
            )}
          </span>
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="tos">
            Accept T&C
          </label>
          <span className="form__error-container form__error-container">
            <input type="checkbox" id="tos" {...register('accept')} />
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
