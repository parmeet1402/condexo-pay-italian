import React from 'react';
import { stringToCurrency } from '../../utils/currency';
const Sidebar = ({ amount = 200 }) => {
  return (
    <div className="pay-your-bill__sidebar">
      <div className="pay-your-bill__sidebar__header">Riepilogo dati:</div>
      <div className="pay-your-bill__sidebar__content">
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Importo iniziale
          </span>
          <span className="pay-your-bill__sidebar__value">
            {stringToCurrency(amount || 0)}
          </span>
        </div>
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">
            Tipologia del bollettino
          </span>
          <span className="pay-your-bill__sidebar__value">Bianco generico</span>
        </div>
        <div className="pay-your-bill__sidebar__row">
          <span className="pay-your-bill__sidebar__label">Numero C/C</span>
          <span className="pay-your-bill__sidebar__value">
            {'8888 8888 9995 9995'}
          </span>
        </div>
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
            {stringToCurrency(amount || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
