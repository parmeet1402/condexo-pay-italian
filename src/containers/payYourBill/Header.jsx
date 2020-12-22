import React from 'react';

const Header = ({ exitFlow, activeVariant }) => {
  const getTitle = (activeVariant) => {
    if (
      activeVariant === 'bollettini' ||
      activeVariant === 'rata__bollettini'
    ) {
      return 'Bollettino';
    } else if (
      activeVariant === 'mav-rav' ||
      activeVariant === 'rata__mav-rav'
    ) {
      return 'MAV/RAV';
    } else if (activeVariant === 'rata') {
      return 'Rata';
    }
  };
  return (
    <div className="pay-your-bill__header">
      <button onClick={exitFlow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-arrow-left"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#0357d3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
        <span>Torna alla Dashboard</span>
      </button>
      <h2>Paga il tuo {getTitle(activeVariant)}</h2>
    </div>
  );
};

export default Header;
