import React from 'react';
import { FormData } from '../../types';

interface CardProps {
  card: FormData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card__container">
      {typeof card.image === 'string' && (
        <img src={card.image} alt={card.name} style={{ maxWidth: '300px' }} />
      )}
      <ul className="card__list">
        <li>
          Name: <span> {card.name}</span>
        </li>
        <li>
          Age: <span> {card.age}</span>
        </li>
        <li>
          Gender: <span> {card.gender}</span>
        </li>
        <li>
          Country: <span> {card.country}</span>
        </li>
        <li>
          Email: <span> {card.email}</span>
        </li>
        <li>
          Password: <span> {card.password1}</span>
        </li>
      </ul>
    </div>
  );
};

export { Card };
