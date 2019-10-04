import React from 'react';
import icons from '../../assets/icons';
import './WhySignUp.scss';
const WhySignUp = props => {
  const { activeStep } = props;

  const showTitle = () => {
    if (activeStep === 4) {
      return 'Welcome to Condexo Pay';
    } else {
      return 'Why Sign Up?';
    }
  };
  return (
    <div className="why-sign-up" style={{ maxWidth: '400px' }}>
      <h1 style={{ textAlign: 'left', maxWidth: '400px' }}>{showTitle()}</h1>
      {activeStep === 4 && <h2>You can now:</h2>}
      {activeStep === 4 ? (
        <ul style={{ maxWidth: '400px' }}>
          <li style={{ paddingLeft: '0' }}>
            {' '}
            Benefit from increased limits for both sending and receiving money
          </li>
          <li style={{ paddingLeft: '0' }}>
            Set up and manage recurring payments
          </li>
          <li style={{ paddingLeft: '0' }}>Make withdrawals</li>
          <li style={{ paddingLeft: '0' }}>View your transaction history</li>
          <li style={{ paddingLeft: '0' }}>
            Generate and use QR codes to pay and get paid quicker and easier
          </li>
        </ul>
      ) : (
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
      )}
    </div>
  );
};

export default WhySignUp;
