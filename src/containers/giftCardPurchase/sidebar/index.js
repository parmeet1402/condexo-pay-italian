import React from 'react';
import { getImageURL } from '../../../utils';
import './Sidebar.scss';
const Sidebar = ({ logo, supplier, isVariable, amount, className }) => {
  return (
    <div className={`gift-card-sidebar ${className}`}>
      <img src={getImageURL(logo)} alt={supplier} />
      <h2
        className="gift-card-sidebar__brand"
        style={isVariable ? { marginBottom: '50px' } : {}}
      >
        {supplier} giftcard
      </h2>
      {isVariable && (
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
      )}
      <span className="gift-card-sidebar__amount">{amount}</span>
    </div>
  );
};

export default Sidebar;
