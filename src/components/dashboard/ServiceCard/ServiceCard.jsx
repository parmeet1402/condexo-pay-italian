import React from 'react';
import Button from '../../common/Button';
import './ServiceCard.scss';
const ServiceCard = ({ title, icon }) => {
  return (
    <div className="service-card">
      <h4>{title}</h4>
      <div className="service-card--image__container">
        <img src={icon} alt="icon" />
      </div>
      <Button color="secondary">Paga</Button>
    </div>
  );
};

export default ServiceCard;
