import React from 'react';

const ReactHookForm: React.FC = () => {
  return (
    <>
      <h2>ReactHookForm</h2>
      <form className="form">
        <div className="form__row">
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input name="name" id="name" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="age">
            Age
          </label>
          <input name="age" id="age" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input name="email" id="email" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="password1">
            Password
          </label>
          <input name="password1" id="password1" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="password2">
            Repeat Password
          </label>
          <input name="password2" id="password2" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="gender">
            Gender
          </label>
          <input name="gender" id="gender" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="image">
            Photo
          </label>
          <input name="image" id="image" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="country">
            Country
          </label>
          <input name="country" id="country" />
        </div>
        <div className="form__row">
          <label className="form__label" htmlFor="tos">
            Accept T&C
          </label>
          <input type="checkbox" id="tos" />
        </div>
        <div className="form__row form__button">
          <button type="submit" disabled={false}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export { ReactHookForm };
