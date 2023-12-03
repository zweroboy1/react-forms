import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card } from '../../components/Card/Card';

const Main: React.FC = () => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  return (
    <>
      <h2>Card List</h2>

      <section className="cards">
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
