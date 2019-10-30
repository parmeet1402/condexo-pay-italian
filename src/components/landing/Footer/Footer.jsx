import React from 'react';
import { Logo } from '../../Logo';
import images from '../../../assets/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="landing-footer">
      <div>
        <div className="landing-footer--upper-section">
          <div className="landing-footer--left-section">
            <Logo />
            <span>Payment accepted</span>
            <img src={images.paymentAccepted} alt="payment accepted" />
          </div>
          <div className="landing-footer--center-section">
            <ul>
              <li>About</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
            <ul>
              <li>Faq</li>
              <li>Link Example</li>
              <li>Link Example</li>
            </ul>
            <ul>
              <li>Faq</li>
              <li>Link Example</li>
              <li>Link Example</li>
            </ul>
          </div>
          <div className="landing-footer--right-section">
            <FontAwesomeIcon
              style={{ color: '#ffffff', width: '30.3px', height: '30.3px' }}
              icon={faInstagram}
            />
            <FontAwesomeIcon
              style={{ color: '#ffffff', width: '30.3px', height: '30.3px' }}
              icon={faTwitter}
            />
            <FontAwesomeIcon
              style={{ color: '#ffffff', width: '30.3px', height: '30.3px' }}
              icon={faFacebook}
            />
          </div>
        </div>
        <hr />

        <div className="landing-footer--lower-section">
          <span>@2019 Condexopay</span>
          <div>
            <span>Privacy</span>
            <span>Cookies</span>
            <span>Disclaimer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
