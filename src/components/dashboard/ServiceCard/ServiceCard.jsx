import React from 'react';

import { Button } from '../Button';
import './ServiceCard.scss';

const ServiceCard = ({ title, icon, onClick }) => {
  return (
    <div className="service-card" onTouchStart={onClick}>
      <h4>{title}</h4>
      <div className="service-card--image__container">
        <img src={icon} alt="icon" />
      </div>
      <Button variant="contained" onClick={onClick}>
        Paga
      </Button>
    </div>
  );
};

export default ServiceCard;
