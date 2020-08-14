import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, IconButton } from '@material-ui/core';
import { Close, ChevronRight } from '@material-ui/icons';
import cn from 'classnames';
import { Formik } from 'formik';
import { Elements } from 'react-stripe-elements';
import Commission from '../../../../components/Commission';

import { AddCardForm } from './addCardForm';
import validationSchema from './schema';
import {
  epayVisa,
  epayMasterCard,
  epayGenericCard,
} from '../../../../assets/images';
import './PaymentScreen.scss';

const PaymentScreen = (props) => {
  useEffect(() => {
    props.fetchCards();

    return () => {
      props.changeCard(null);
    };
  }, []);

  const handleCardChange = ({ target }) => {
    props.changeCard(target.value);
  };

  const handleStepBack = () => {
    props.destroyReserveTransId();
    props.changeStep(1);
  };

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
    (props.cards || []).map((card) => (
      <div className="payment-card" key={card._id}>
        <Radio
          value={card.stripeCardId}
          checked={props.selectedCard === card.stripeCardId}
          onChange={handleCardChange}
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
          onClick={() =>
            props.deleteCard({
              cardId: card._id,
              stripeCardId: card.stripeCardId,
            })
          }
        >
          <Close />
        </IconButton>
      </div>
    ));

  return (
    <div className="payment">
      <div className="payment-content">
        {getUserCards()}
        <div
          className={cn('payment-card payment-card--lean', {
            'no-border': props.selectedCard === 'new',
          })}
        >
          <Radio
            value="new"
            checked={props.selectedCard === 'new'}
            onChange={handleCardChange}
            color="primary"
            size="medium"
          />
          <p>Nuova carta di credito</p>
          <ChevronRight
            className={cn('payment-chevron', {
              'payment-chevron--rotate': props.selectedCard === 'new',
            })}
          />
        </div>
        {props.selectedCard === 'new' && (
          <Elements>
            <Formik
              render={(formikProps) => (
                <AddCardForm
                  {...formikProps}
                  goBack={handleStepBack}
                  addCardAndPay={props.addCardAndPay}
                  isLoading={props.isLoading}
                />
              )}
              initialValues={{ name: '' }}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={(values, actions) => {}}
              validationSchema={validationSchema}
            />
          </Elements>
        )}
        {props.selectedCard !== 'new' && (
          <div className="payment-btns">
            <Button variant="outlined" size="large" onClick={handleStepBack}>
              Indietro
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disabled={!props.selectedCard || props.isLoading}
              onClick={props.payRecharge}
            >
              Procedi
            </Button>
          </div>
        )}
      </div>
      <Commission />
    </div>
  );
};

PaymentScreen.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      stipeCardId: PropTypes.string,
      nameOnCard: PropTypes.string,
      cardNumber: PropTypes.string,
      expiryMonth: PropTypes.string,
      cardToken: PropTypes.string,
      cardType: PropTypes.string,
    })
  ),
  selectedCard: PropTypes.string,
  changeCard: PropTypes.func,
  changeStep: PropTypes.func,
  fetchCards: PropTypes.func,
  addCardAndPay: PropTypes.func,
  isLoading: PropTypes.bool,
  payRecharge: PropTypes.func,
  deleteCard: PropTypes.func,
  destroyReserveTransId: PropTypes.func,
};

export { PaymentScreen };
