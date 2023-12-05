import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/Card/Card';

const Main: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  const cards = useSelector((state: RootState) => state.cards.cards);
  return (
    <>
      <h2>Card List</h2>

      <section
        className={state && state.success ? 'cards cards__success' : 'cards'}
      >
        {cards.length ? (
          cards.map((card, index) => <Card key={index} card={card} />)
        ) : (
          <p className="cards__no-message">There are no submitted forms!</p>
        )}
      </section>
    </>
  );
};

export { Main };
