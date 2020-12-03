import React from 'react';
import Card from '@material-ui/core/Card';
import Sidebar from '../../Sidebar.jsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../../../components/common/Button';
import { Close, ChevronRight } from '@material-ui/icons';
import { Radio, IconButton } from '@material-ui/core';
import {
  epayVisa,
  epayMasterCard,
  epayGenericCard,
} from '../../../../assets/images';
import './style.scss';
const StepThree = ({
  goStepAhead,
  goStepBack,
  selectedCard = '',
  cards = [
    {
      isActive: true,
      _id: 'df',
      stripeCardId: '',
      nameOnCard: 'Test user',
      cardNumber: '2322',
      expiryMonth: '02',
      expiryYear: '2022',
      cardType: 'visa',
    },
    {
      isActive: true,
      _id: 'df',
      stripeCardId: '',
      nameOnCard: 'Test user',
      cardNumber: '2322',
      expiryMonth: '02',
      expiryYear: '2022',
      cardType: 'visa',
    },
    {
      isActive: true,
      _id: 'df',
      stripeCardId: '',
      nameOnCard: 'Test user',
      cardNumber: '2322',
      expiryMonth: '02',
      expiryYear: '2022',
      cardType: 'visa',
    },
  ],
}) => {
  const BlueButton = withStyles({
    root: {
      color: '#1a315b',
      backgroundColor: '#fff',
      border: '1px solid',
      borderColor: '#1a315b',
      borderRadius: 0,
      fontWeight: 'normal',
      padding: '12px 24px',

      '&:hover': {
        backgroundColor: '#1a315b',
        borderColor: '#1a315b',
        boxShadow: 'none',
        color: '#fff',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#1a315b',
        borderColor: '#1a315b',
        color: '#fff',
      },
      '&:focus': {},
    },
  })(Button);

  const GreyButton = withStyles({
    root: {
      color: '#a4abb5',
      backgroundColor: '#fff',
      border: 'solid 1px #a4abb5',
      borderRadius: 0,
      fontWeight: 'normal',

      '&:hover': {
        backgroundColor: '#fff',
        borderColor: '#a4abb5',
        border: '1px solid',
        boxShadow: 'none',
        color: '#a4abb5',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#fff',
        border: '1px solid',
        borderColor: '#a4abb5',
      },
      '&:focus': {},
    },
  })(Button);

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'visa':
        return epayVisa;
      case 'mastercard':
        return epayMasterCard;
      default:
        return epayGenericCard;
    }
  };
  const padStars = (cardNumber) => `**** **** **** ${cardNumber}`;
  const getUserCards = () =>
    (cards || [])
      .filter((card) => card.isActive)
      .map((card) => (
        <div className="payment-card" key={card._id}>
          <Radio
            value={card.stripeCardId}
            checked={selectedCard === card.stripeCardId}
            onChange={console.log}
            color="primary"
            size="medium"
          />
          <img src={getIcon(card.cardType)} alt={card.cardType} />
          <div className="payment-card-details">
            <span>{card.nameOnCard}</span>
            <span>{padStars(card.cardNumber)}</span>
            <span>
              Valido fino al {card.expiryMonth}/{card.expiryYear}
            </span>
          </div>
          <IconButton
            onClick={() => {
              // todo: card click
              /*  if (selectedCard === card.stripeCardId) {
                handleCardChange({
                  target: {
                    value: null,
                  },
                });
              }

              deleteCard({
                cardId: card._id,
                stripeCardId: card.stripeCardId,
              }); */
            }}
          >
            <Close />
          </IconButton>
        </div>
      ));

  return (
    <div className="bollettino-page__step-three">
      <div className="payment cards">
        <div className="payment-content">{getUserCards()}</div>
        <div
          className="bollettino-page__footer"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            variant="outlined"
            style={{ borderRadius: 0, width: '102px' }}
            onClick={goStepBack}
          >
            Indietro
          </Button>
          <BlueButton
            style={{
              width: '131px',
              height: '42px',
              // marginTop: '52px',
            }}
            onClick={goStepAhead}
          >
            Procedi
          </BlueButton>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default StepThree;
