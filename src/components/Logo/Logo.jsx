import React from 'react';
import LogoImage from '../../assets/images/logo.svg';
import LogoDark from '../../assets/images/logo-dark.png';
import './Logo.scss';
const Logo = (props) => {
  const isDark = props.isDark;
  return (
    <div className="logo">
      <img
        src={isDark ? LogoDark : LogoImage}
        alt="logo"
        style={{ width: isDark ? '50%' : '100%' }}
      />
    </div>
  );
};

export default Logo;
