import React from 'react';
import LogoImage from '../../assets/images/logo.svg';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { smoothScroll } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';
import { connect } from 'react-redux';
import { AuthSelectors } from '../../redux/AuthRedux';
const Navbar = props => {
  const { currentUser } = props;
  const isLoggedIn = !!currentUser && !!currentUser.token;
  return (
    <div className="navbar--container">
      <div className="navbar">
        <img src={LogoImage} alt="logo" className="navbar--logo" />
        {isLoggedIn ? (
          <Link to="/profile">
            <FontAwesomeIcon
              size="3x"
              icon={faUserCircle}
              className="navbar--user-icon"
            />
          </Link>
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
                  rounded
                  size="large"
                  borderColor="#9b9b9b"
                  style={{ width: '160px' }}
                >
                  <span style={{ color: '#222222' }}>Login</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  style={{ width: '160px', marginLeft: '12px' }}
                  color="secondary"
                  rounded
                  size="large"
                >
                  Registrati
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  currentUser: AuthSelectors.selectCurrentUser(state)
});

export default connect(mapStateToProps)(Navbar);
