import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '../Button';
import './MyPaymentCard.scss';

const MyPaymentCard = ({ title, icon, onClick }) => {
  return (
    <div className="my-payment-card" onTouchStart={onClick}>
      <div className="my-payment-card--icon__container">
        <FontAwesomeIcon
          className="my-payment-card--icon"
          icon={icon}
          size="3x"
        />
      </div>
      <h5>{title}</h5>
      <Button variant="outlined" onClick={onClick}>
        Vedi
      </Button>
    </div>
  );
};

export default MyPaymentCard;
