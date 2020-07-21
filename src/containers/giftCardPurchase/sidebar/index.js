import React from 'react';
import { getImageURL } from '../../../utils';
import './Sidebar.scss';
const Sidebar = ({ logo, supplier, isVariable, amount, className }) => {
  return (
    <div className={`gift-card-sidebar ${className}`}>
      <img src={getImageURL(logo)} alt={supplier} />
      <h2 className="gift-card-sidebar__brand">{supplier} giftcard</h2>
      {isVariable && <span>da 5,00 € a 500,00 €</span>}
      <span className="gift-card-sidebar__amount">{amount}</span>
    </div>
  );
};

export default Sidebar;
