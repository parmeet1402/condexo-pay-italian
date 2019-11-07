import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';
import './MyPaymentCard.scss';

const MyPaymentCard = ({ title, icon, link }) => {
  return (
    <div className="my-payment-card">
      <div className="my-payment-card--icon__container">
        <FontAwesomeIcon
          className="my-payment-card--icon"
          icon={icon}
          size="3x"
        />
      </div>
      <h5>{title}</h5>
      <Link to={link || ''} style={{ textDecoration: 'none' }}>
        <Button variant="outlined" borderColor="#1a315b" padding="6px 38px">
          <span style={{ color: '#1a315b', fontWeight: 'normal' }}>Vedi</span>
        </Button>
      </Link>
    </div>
  );
};

export default MyPaymentCard;
