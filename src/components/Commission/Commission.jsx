import React from 'react';
import './Commission.scss';

const Commission = ({
  headerColor = '#4a90e2',
  typeOfPayment,
  grandTotal = 0,
  baseAmount = 0,
  last4Digits,
}) => {
  return (
    <div className="commission">
      <div
        className="commission__header"
        style={{ backgroundColor: headerColor }}
      >
        <h2>Riepilogo dati:</h2>
      </div>
      <div className="commission__content">
        <div className="commission__content__row">
          <span className="commission__content__label">Importo iniziale</span>
          <span className="commission__content__value">{baseAmount}</span>
        </div>
        <div className="commission__content__row">
          <span className="commission__content__label">
            Tipologia del bollettino
          </span>
          <span className="commission__content__value">Gift Card</span>
        </div>
        <div className="commission__content__row">
          <span className="commission__content__label">Numero C/C</span>
          <span className="commission__content__value">
            {last4Digits ? `**** **** **** ${last4Digits}` : ''}
          </span>
        </div>
        <div className="commission__content__row">
          <span className="commission__content__label">
            Commissioni Condexo
          </span>
          <span className="commission__content__value">200</span>
        </div>
        <div className="commission__content__row">
          <span className="commission__content__label">Commissioni Stripe</span>
          <span className="commission__content__value">200</span>
        </div>
        {/* <div className="commission__content__row">
          <span className="commission__content__label">
            Commissione Paytipper
          </span>
          <span className="commission__content__value">200</span>
        </div> */}
        <div className="commission__content__row sum">
          <span className="commission__content__label sum">IMPORTO</span>
          <span className="commission__content__value sum">{grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Commission;
