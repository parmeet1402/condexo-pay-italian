import React from 'react';
import {
  getCondexoCommissionAmount,
  getStripeCommissionAmount,
  getTotalInclusiveOfCommissions,
} from '../../utils/commissions.js';
import { stringToCurrency } from '../../utils/currency';
import './Commission.scss';

const Commission = ({
  headerColor = '#4a90e2',
  typeOfPayment,
  baseAmount = 0,
  last4Digits,
}) => {
  console.log('AMOUNT RECEIVED', baseAmount);
  console.log('FORMATTED AMOUNT', stringToCurrency(baseAmount));
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
          <span className="commission__content__value">
            {stringToCurrency(baseAmount)}
          </span>
        </div>
        <div className="commission__content__row">
          <span className="commission__content__label">
            Tipologia del bollettino
          </span>
          <span className="commission__content__value">{typeOfPayment}</span>
        </div>
        {last4Digits && (
          <div className="commission__content__row">
            <span className="commission__content__label">Numero C/C</span>
            <span className="commission__content__value">
              {`**** **** **** ${last4Digits}`}
            </span>
          </div>
        )}
        {/* <div className="commission__content__row">
          <span className="commission__content__label">
            Commissioni Condexo
          </span>
          <span className="commission__content__value">0,25 €</span>
        </div> */}
        <div className="commission__content__row">
          <span className="commission__content__label">Commissioni</span>
          <span className="commission__content__value">1.4% * 0,50 €</span>
        </div>
        {/* <div className="commission__content__row">
          <span className="commission__content__label">
            Commissione Paytipper
          </span>
          <span className="commission__content__value">200</span>
        </div> */}
        <div className="commission__content__row sum">
          <span className="commission__content__label sum">IMPORTO</span>
          <span className="commission__content__value sum">
            {stringToCurrency(getTotalInclusiveOfCommissions(baseAmount) || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Commission;
