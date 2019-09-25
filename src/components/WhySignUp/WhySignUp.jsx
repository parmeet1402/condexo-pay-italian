import React from 'react';
import icons from '../../assets/icons';
import './WhySignUp.scss';
const WhySignUp = () => {
  return (
    <div className="why-sign-up">
      <h1>Why Sign Up?</h1>
      <ul>
        <li>
          <img src={icons.freeSignUp1} alt="Secure" />
          Secure
        </li>
        <li>
          <img src={icons.freeSignUp2} alt="Free Transfers" />
          Free Transfers
        </li>
        <li>
          <img src={icons.freeSignUp3} alt="Money back guarantee" />
          Money back guarantee
        </li>
        <li>
          <img src={icons.freeSignUp4} alt="Pay with QR Code" />
          Pay with QR Code
        </li>
      </ul>
    </div>
  );
};

export default WhySignUp;
