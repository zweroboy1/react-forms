import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ul className={styles['header__list']}>
        <li className={styles['header__item']}>
          <NavLink to="/">Main</NavLink>
        </li>
        <li className={styles['header__item']}>
          <NavLink to="/uncontrolled-form">Uncontrolled Form</NavLink>
        </li>
        <li className={styles['header__item']}>
          <NavLink to="/hook-form">React Hook Form</NavLink>
        </li>
      </ul>
    </header>
  );
};

export { Header };
