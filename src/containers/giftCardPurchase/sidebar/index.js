import React from 'react';
import { getImageURL } from '../../../utils';
import './Sidebar.scss';
import { getTotalInclusiveOfCommissions } from '../../../utils/commissions';
import { stringToCurrency } from '../../../utils/currency';
const Sidebar = ({ logo, supplier, isVariable, amount = 0, className }) => {
  return (
    <div
      className={`gift-card-sidebar ${className}`}
      style={{
        ...(supplier === 'Linkem' && { paddingTop: '0px' }),
      }}
    >
      <img className={supplier} src={getImageURL(logo)} alt={supplier} />
      <h2
        style={{
          ...(supplier === 'Linkem' && { marginTop: '0px' }),
        }}
        className="gift-card-sidebar__brand"
        // style={isVariable ? { marginBottom: '50px' } : {}}
      >
        {supplier} giftcard
      </h2>
      {/* {isVariable && (
        <p
          style={{
            fontSize: '28px',
            color: '#575757',
            fontWeight: 'normal',
            marginBottom: '40px',
          }}
        >
          da 5,00 € a 500,00 €
        </p>
      )} */}
      <div className="gift-card-sidebar__commission__container">
        <div className="gift-card-sidebar__commission__row">
          <span className="gift-card-sidebar__commission__label">
            Importo inziale
          </span>
          <span className="gift-card-sidebar__commission__value">
            {stringToCurrency(amount || 0)}
          </span>
        </div>
        <div className="gift-card-sidebar__commission__row">
          <span className="gift-card-sidebar__commission__label">
            Commissioni Condexo
          </span>
          <span className="gift-card-sidebar__commission__value">0,25 €</span>
        </div>
        <div className="gift-card-sidebar__commission__row">
          <span className="gift-card-sidebar__commission__label">
            Commissioni Stripe
          </span>
          <span className="gift-card-sidebar__commission__value">
            1.4% + 0,25 €
          </span>
        </div>
        <div className="gift-card-sidebar__commission__row sum">
          <span className="gift-card-sidebar__commission__label sum">
            IMPORTO
          </span>
          <span className="gift-card-sidebar__commission__value sum">
            {stringToCurrency(getTotalInclusiveOfCommissions(amount) || 0)}
          </span>
        </div>
      </div>
      {/* <span className="gift-card-sidebar__amount">{amount}</span> */}
    </div>
  );
};

export default Sidebar;
