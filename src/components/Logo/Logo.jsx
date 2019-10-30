import React from 'react';
import LogoImage from '../../assets/images/logo.svg';
import './Logo.scss';
const Logo = props => {
  return (
    <div className="logo">
      <img src={LogoImage} alt="logo" />
    </div>
  );
};

export default Logo;
