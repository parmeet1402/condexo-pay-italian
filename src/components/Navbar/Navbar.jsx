import React, { useState, useRef } from 'react';
import LogoImage from '../../assets/images/logoAlt.png';
import LogoImageDark from '../../assets/images/logo-dark.png';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { smoothScroll } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';
import { connect } from 'react-redux';
import AuthActions, { AuthSelectors } from '../../redux/AuthRedux';
import GiftCardActions from '../../redux/GiftCardRedux';
const Navbar = (props) => {
  const { currentUser } = props;
  const [isLoggedInUserMenuVisible, setLoggedInUserMenuVisibility] = useState(
    false
  );
  const loggedInUserMenu = useRef(null);
  const isLoggedIn = !!currentUser && !!currentUser.token;
  const showLoggedInUserMenu = () => {
    setLoggedInUserMenuVisibility(true);
    document.addEventListener('click', hideLoggedInUserMenu);
  };

  const hideLoggedInUserMenu = () => {
    document.removeEventListener('click', hideLoggedInUserMenu);
    setLoggedInUserMenuVisibility(false);
  };

  return (
    <div
      className="navbar--container"
      style={{ backgroundColor: isLoggedIn ? '#fff' : '#10233e' }}
    >
      <div className="navbar">
        {/* <h1 style={{ size: '26px' }}>
          <span style={{ fontWeight: 'bolder' }}>Condexo</span>
          <span style={{ fontFamily: 'ArialRounded', fontWeight: 'bold' }}>
            Pay
          </span>
        </h1> */}
        <img
          src={isLoggedIn ? LogoImageDark : LogoImage}
          alt="logo"
          className="navbar--logo"
          style={{ width: '200px' }}
        />
        {isLoggedIn ? (
          <>
            <FontAwesomeIcon
              size="3x"
              icon={faUserCircle}
              className="navbar--user-icon"
              onClick={() => {
                if (isLoggedInUserMenuVisible) {
                  hideLoggedInUserMenu();
                } else {
                  showLoggedInUserMenu();
                }
              }}
            />
            {isLoggedInUserMenuVisible && (
              <div className="logged-in-user-menu" ref={loggedInUserMenu}>
                <span
                  onClick={() =>
                    history.push('/profile') || props.resetBackToInitialState()
                  }
                >
                  Profile
                </span>
                <span
                  onClick={() => {
                    props.setLoggedOut();
                    history.push('/login');
                  }}
                >
                  Log out
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="navbar--content">
            <div className="navbar--links-container">
              <span
                className="navbar--links"
                onClick={() => smoothScroll(props.featureCard4Ref)}
              >
                Cos’è condexo pay
              </span>
              <span
                className="navbar--links"
                onClick={() => smoothScroll(props.featureCard1Ref)}
              >
                Pagamenti
              </span>
            </div>
            <div className="navbar--buttons">
              <Link to="/login">
                <Button
                  variant="outlined"
                  // rounded
                  size="large"
                  style={{
                    width: '160px',
                    borderRadius: '4px',
                    border: 'none',
                    background: '#4a90e2',
                  }}
                >
                  <span style={{ color: '#fff' }}>Login</span>
                </Button>
              </Link>
              {/* <Link to="/register">
                <Button
                  style={{
                    width: '160px',
                    marginLeft: '12px'
                  }}
                  color="secondary"
                  rounded
                  size="large"
                >
                  Registrati
                </Button>
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: AuthSelectors.selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  setLoggedOut: () => dispatch(AuthActions.setLoggedOut()),
  resetBackToInitialState: () =>
    dispatch(GiftCardActions.resetBackToInitialState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
