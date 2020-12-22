import React, { useEffect } from 'react';
import cn from 'classnames';
import { Elements } from 'react-stripe-elements';
import { Formik } from 'formik';

import Card from '@material-ui/core/Card';
import Sidebar from '../../Sidebar.jsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// import Button from '../../../../components/common/Button';
import { Close, ChevronRight } from '@material-ui/icons';
import { Radio, IconButton } from '@material-ui/core';
import {
  epayVisa,
  epayMasterCard,
  epayGenericCard,
} from '../../../../assets/images';
import AddCardForm from './addCardForm';
import GuestAddCard from '../../../giftCardPurchase/payment/GuestAddCard';
import './style.scss';
const StepThree = ({
  user,
  cards,
  fetchCardsRequest,
  addCardRequest,
  deleteCardRequest,
  data: { cardToken, last4Digits },
  handleChange,
  goStepAhead,
  goStepBack,
  setActiveStep,
  activeVariant,
  amount: { amountToLeftOfDecimal, amountToRightOfDecimal } = {},
  makeBillRequest,
}) => {
  useEffect(() => {
    fetchCardsRequest();
  }, []);

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
  const handleCardChange = (e, cardNumber) => {
    handleChange('stepThree', 'cardToken', e.target.value);
    handleChange('stepThree', 'last4Digits', cardNumber);
    // handleChange('stepThree', key, value);
  };

  const getUserCards = () =>
    (cards || [])
      .filter((card) => card.isActive)
      .map((card) => (
        <div className="payment-card" key={card._id}>
          <Radio
            className="pay-your-bill__radio"
            value={card.stripeCardId}
            checked={cardToken === card.stripeCardId}
            onChange={(e) => handleCardChange(e, card.cardNumber)}
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
  if (user && user._id) {
    return (
      <div className="bollettino-page__step-three">
        <div className="payment cards">
          <div className="payment-content">{getUserCards()}</div>
          <div
            className={cn('payment-card payment-card--lean', {
              'no-border': cardToken === 'new',
            })}
          >
            <Radio
              value={'new'}
              checked={cardToken === 'new'}
              onChange={handleCardChange}
              color="primary"
              size="medium"
            />
            <p>Nuova carta di credito</p>
            <ChevronRight
              className={cn('payment-chevron', {
                'payment-chevron--rotate': cardToken === 'new',
              })}
            />
          </div>
          {cardToken === 'new' && (
            <Elements>
              <>
                <Formik
                  render={(props) => (
                    <AddCardForm
                      {...props}
                      goBack={() => setActiveStep(1)}
                      selectedCard={cardToken}
                      handleSelectedCardChange={handleChange}
                      topUpGiftCardRequest={makeBillRequest}
                      addProfileCardRequest={addCardRequest}
                      successMessage={''}
                    />
                  )}
                  initialValues={{ name: '' }}
                  validateOnChange={false}
                  validateOnBlur={true}
                  onSubmit={(values, actions) => {}}
                  // validationSchema={validationSchema}
                />
              </>
            </Elements>
          )}

          {cardToken !== 'new' && (
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
                onClick={() => makeBillRequest({ paymentSource: cardToken })}
              >
                Procedi
              </BlueButton>
            </div>
          )}
        </div>

        <Sidebar
          activeVariant={activeVariant}
          data={{
            amountToLeftOfDecimal,
            amountToRightOfDecimal,
            last4Digits,
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="bollettino-page__step-three guest">
        <div className="payment cards">
          <Elements>
            <Formik
              render={(formikProps) => (
                <GuestAddCard
                  {...formikProps}
                  changeCard={console.log}
                  selectedCard={''}
                  payRecharge={console.log}
                />
              )}
              initialValues={{ name: '' }}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={(values, actions) => {}}
              // validationSchema={validationSchema}
            />
          </Elements>
        </div>
        <Sidebar
          activeVariant={activeVariant}
          data={{
            amountToLeftOfDecimal,
            amountToRightOfDecimal,
            last4Digits,
          }}
        />
      </div>
    );
  }
};

export default StepThree;
