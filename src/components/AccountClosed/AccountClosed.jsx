import React from 'react';
import Logo from '../Logo';
const AccountClosed = () => {
  return (
    <div className="account-closed__container">
      <div className="account-closed__card">
        <Logo />
        <p>Il tuo account è stato chiuso correttamente.</p>
      </div>
    </div>
  );
};

export default AccountClosed;
