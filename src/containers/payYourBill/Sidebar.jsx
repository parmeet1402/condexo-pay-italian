import React from 'react';
import { mergeAndFormatAmount, stringToCurrency } from '../../utils/currency';
import { getTotalInclusiveOfCommissionsAndPaytipper } from '../../utils/commissions';
const Sidebar = ({
  activeVariant,
  data: { amountToLeftOfDecimal, amountToRightOfDecimal, last4Digits } = {},
}) => {
  const getTypeOfPurchase = () =>
    activeVariant === 'mav-rav'
      ? 'MAV/RAV'
      : activeVariant === 'rata'
      ? 'RATA'
      : 'Bianco generico';

  return (
    <div
      className="pay-your-bill__sidebar"
      style={last4Digits ? { height: '460px' } : {}}
    >
      <div className="pay-your-bill__sidebar__header">Riepilogo dati:</div>
      <div className="pay-your-bill__sidebar__content">
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Importo iniziale
          </span>
          <span className="pay-your-bill__sidebar__value">
            {mergeAndFormatAmount(
              amountToLeftOfDecimal,
              amountToRightOfDecimal
            )}
          </span>
        </div>
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Tipologia del bollettino
          </span>
          <span className="pay-your-bill__sidebar__value">
            {getTypeOfPurchase()}
          </span>
        </div>
        {last4Digits && (
          <div className="pay-your-bill__sidebar__row">
            <span className="pay-your-bill__sidebar__label">Numero C/C</span>
            <span className="pay-your-bill__sidebar__value">
              {`XXXX XXXX XXXX ${last4Digits}`}
            </span>
          </div>
        )}
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Commissioni Condexo
          </span>
          <span className="pay-your-bill__sidebar__value">{'0.25 €'}</span>
        </div>
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Commissioni Stripe
          </span>
          <span className="pay-your-bill__sidebar__value">
            {'1.4% + 0.25 €'}
          </span>
        </div>
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Commissioni Paytipper
          </span>
          <span className="pay-your-bill__sidebar__value">{'2.00 €'}</span>
        </div>
        <div className="pay-your-bill__sidebar__row sum">
          <span className="pay-your-bill__sidebar__label sum">IMPORTO</span>
          <span className="pay-your-bill__sidebar__value sum">
            {stringToCurrency(
              getTotalInclusiveOfCommissionsAndPaytipper(
                +`${amountToLeftOfDecimal}.${amountToRightOfDecimal}`
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
