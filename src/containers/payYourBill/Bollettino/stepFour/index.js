import React from 'react';
import history from '../../../../utils/history';
import images from '../../../../assets/icons';
import { stringToCurrency } from '../../../../utils/currency';
import Button from '../../../../components/common/Button';
import { withStyles } from '@material-ui/core/styles';

const OrangeButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#ff7330',
    border: '1px solid',
    borderColor: '#ff7330',
    borderRadius: 4,
    fontWeight: 'normal',
    padding: '8px 32px',
    marginTop: '32px',

    '&:hover': {
      backgroundColor: '#ff7330',
      borderColor: '#ff7330',
      boxShadow: 'none',
      color: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ff7330',
      borderColor: '#ff7330',
      color: '#fff',
    },
    '&:focus': {},
  },
})(Button);

const Card = ({ type, cardNo, code, amount, billNo }) => {
  return (
    <div className="bollettino-page__step-four__card scroll-element">
      <div className="bollettino-page__step-four__card__icon">
        <img src={images.bollettini} alt="bollettini" />
      </div>
      <h2>Riepilogo bollettino</h2>
      <div className="bollettino-page__step-four__card__row">
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Tipologia di bollettino
          </div>
          <div className="bollettino-page__step-four__card__value">{type}</div>
        </div>
      </div>
      <div className="bollettino-page__step-four__card__row">
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Numero C/C
          </div>
          <div className="bollettino-page__step-four__card__value">
            {cardNo}
          </div>
        </div>
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Codice bollettino
          </div>
          <div className="bollettino-page__step-four__card__value">{code}</div>
        </div>
      </div>
      <div className="bollettino-page__step-four__card__row">
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Numero C/C
          </div>
          <div className="bollettino-page__step-four__card__value">
            {billNo}
          </div>
        </div>
      </div>
      <div className="bollettino-page__step-four__card__item total">
        <div className="bollettino-page__step-four__card__label">Importo</div>
        <div className="bollettino-page__step-four__card__value">
          {stringToCurrency(amount)}
        </div>
      </div>
    </div>
  );
};

const StepFour = () => {
  const goToPayments = () => {
    history.push('/miei_pagamenti');
  };

  return (
    <div className="bollettino-page__step-four">
      <h1>Pagamento avvenuto con successo!</h1>
      <OrangeButton onClick={goToPayments}>Vai a I MIEI PAGAMENTI</OrangeButton>
      <div className="scroller">
        <Card
          type="674 – Premarcato non fatturatore"
          cardNo="34567654356789765"
          code="28928763782983767829"
          amount="300"
          billNo="Bolletta numero 5678"
        />
        <Card
          type="674 – Premarcato non fatturatore"
          cardNo="34567654356789765"
          code="28928763782983767829"
          amount="300"
          billNo="Bolletta numero 5678"
        />{' '}
        <Card
          type="674 – Premarcato non fatturatore"
          cardNo="34567654356789765"
          code="28928763782983767829"
          amount="300"
          billNo="Bolletta numero 5678"
        />
      </div>
    </div>
  );
};

export default StepFour;
