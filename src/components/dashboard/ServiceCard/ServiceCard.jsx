import React from 'react';

import { Button } from '../Button';
import './ServiceCard.scss';

const ServiceCard = ({ title, icon, onClick }) => {
  // const isDisabled = title !== 'Ricariche & Buoni';
  const isDisabled = false;
  return (
    <div
      className={`service-card ${isDisabled ? 'is-disabled' : ''}`}
      onClick={onClick}
    >
      <h4>{title}</h4>
      <div className="service-card--image__container">
        <img src={icon} alt="icon" />
      </div>
      <Button
        variant="contained"
        onClick={isDisabled ? null : onClick}
        disabled={isDisabled}
      >
        Paga
      </Button>
    </div>
  );
};

export default ServiceCard;
