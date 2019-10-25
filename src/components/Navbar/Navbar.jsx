import React from 'react';
import LogoImage from '../../assets/images/logo.svg';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import './Navbar.scss';
const Navbar = () => {
  return (
    <div className="navbar--container">
      <div className="navbar">
        <img src={LogoImage} alt="logo" className="navbar--logo" />
        <div className="navbar--content">
          <div className="navbar--links-container">
            <Link to="/" className="navbar--links">
              Cos’è condexo pay
            </Link>
            <Link to="/" className="navbar--links">
              Pagamenti
            </Link>
          </div>
          <div className="navbar--buttons">
            <Button
              variant="outlined"
              rounded
              size="large"
              borderColor="#9b9b9b"
            >
              <span style={{ color: '#222222' }}>Login</span>
            </Button>
            <Button color="secondary" rounded size="large">
              Registrati
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
