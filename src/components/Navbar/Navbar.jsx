import React, { useState, useRef } from 'react';
import LogoImage from '../../assets/images/logo.svg';
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

  const redirectToHomepage = () => {
    if (isLoggedIn) {
      history.push({
        pathname: '/dashboard',
      });
    } else {
      history.push({
        pathname: '/',
      });
    }
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
        {/* <img
          src={isLoggedIn ? LogoImageDark : LogoImage}
          alt="logo"
          className="navbar--logo"
          style={{ width: '200px', cursor: 'pointer' }}
          onClick={redirectToHomepage}
        /> */}

        {isLoggedIn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="299px"
            height="36px"
            viewBox="0 0 490 63"
            onClick={redirectToHomepage}
            style={{ cursor: 'pointer' }}
          >
            <text
              fill="none"
              fill-rule="evenodd"
              font-family="Poppins-Bold, Poppins"
              font-size="65"
              font-weight="bold"
              letter-spacing="-.595"
              transform="translate(-185 -199)"
            >
              <tspan x="183" y="248" fill="#00E1CB">
                Condexo
              </tspan>{' '}
              <tspan
                x="478.68"
                y="248"
                fill="#10233E"
                font-family="ArialRoundedMTBold, Arial Rounded MT Bold"
                font-weight="normal"
              >
                Pay
              </tspan>
            </text>
          </svg>
        ) : (
          <svg
            width="299px"
            height="36px"
            viewBox="0 0 302 47"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={redirectToHomepage}
            style={{ cursor: 'pointer' }}
          >
            <title>CondexoPay</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g
              id="CONDEXO-PAY"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              font-family="Poppins-Bold, Poppins"
              font-size="48"
              font-weight="bold"
              letter-spacing="-0.4393843"
            >
              <g id="login-ita" transform="translate(-42.000000, -57.000000)">
                <g id="Group-5">
                  <text id="CondexoPay" style={{ 'mix-blend-mode': 'lighten' }}>
                    <tspan x="41" y="93" fill="#FFFFFF">
                      Condexo
                    </tspan>
                    <tspan
                      x="259.34831"
                      y="93"
                      font-family="ArialRoundedMTBold, Arial Rounded MT Bold"
                      font-weight="normal"
                      fill="#27DDCB"
                    >
                      Pay
                    </tspan>
                  </text>
                </g>
              </g>
            </g>
          </svg>
        )}
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
                    history.push('/profilo') || props.resetBackToInitialState()
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
