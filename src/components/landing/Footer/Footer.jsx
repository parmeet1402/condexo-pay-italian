import React from 'react';
import { Logo } from '../../Logo';
import LogoImage from '../../../assets/images/logoAlt.png';
import images from '../../../assets/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="landing-footer">
      <div>
        <div className="landing-footer--upper-section">
          <div className="landing-footer--left-section">
            <img src={LogoImage} alt="logo" className="navbar--logo" />
          </div>
          <ul className="landing-footer--center-section">
            {/* <li>About</li>
            <li>Careers</li>
            <li>Faq</li> */}
          </ul>
          <div className="landing-footer--right-section">
            <div className="landing-footer--right-section__payment-accepted-container">
              <span
                style={{
                  color: 'white',
                  fontSize: '10px',
                  marginBottom: '6px',
                }}
              >
                Payment accepted
              </span>
              <img
                className="landing-footer--right-section__payment-accepted"
                src={images.paymentAccepted}
                alt="payment accepted"
              />
            </div>
            {/* <FontAwesomeIcon
              className="landing-footer--right-section__social-media-icon"
              icon={faInstagram}
            />
            <FontAwesomeIcon
              className="landing-footer--right-section__social-media-icon"
              icon={faTwitter}
            />
            <FontAwesomeIcon
              className="landing-footer--right-section__social-media-icon"
              icon={faFacebook}
            /> */}
          </div>
        </div>
        <hr />

        <div className="landing-footer--lower-section">
          <span>&copy;2020 CondexoPay</span>
          <div>
            <span>Faq</span>
            <a
              href={`${window.location.origin}/privacy`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                // fontSize: '12px',
                color: '#fff',
                marginLeft: '27px',
                // borderBottom: '1px solid',
              }}
            >
              <span>Privacy</span>
            </a>

            <a
              href={`${window.location.origin}/condizioni`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                // fontSize: '12px',
                color: '#fff',
                marginLeft: '27px',
                // borderBottom: '1px solid',
              }}
            >
              <span>Condizioni</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
