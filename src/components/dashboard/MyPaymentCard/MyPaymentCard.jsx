import React from 'react';

import { Button } from '../Button';
import './MyPaymentCard.scss';

const MyPaymentCard = ({ title, icon, onClick }) => {
  return (
    <div className="my-payment-card" onClick={onClick}>
      <div className="my-payment-card--icon__container">
        <img src={icon} alt="payment-icon" className="my-payment-card--icon" />
      </div>
      <h5>{title}</h5>
      <Button variant="outlined" onClick={onClick}>
        Vedi
      </Button>
    </div>
  );
};

export default MyPaymentCard;
