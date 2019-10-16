import React from 'react';
import icons from '../../assets/icons';
import './WhySignUp.scss';
const WhySignUp = props => {
  const { activeStep } = props;

  const showTitle = () => {
    if (activeStep === 4) {
      return 'Welcome to Condexo Pay';
    } else {
      return ' Registrati per ottenere tutti i vantaggi di Condexo Pay:';
    }
  };
  return (
    <div className="why-sign-up" style={{ maxWidth: '460px' }}>
      <h1 style={{ textAlign: 'left', maxWidth: '460px', fontSize: '36px' }}>
        {showTitle()}
      </h1>
      {activeStep === 4 && <h2>You can now:</h2>}
      {activeStep === 4 ? (
        <ul style={{ maxWidth: '460px' }}>
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
            <img src={icons.freeSignUp1} alt="Pagamenti sicuri" />
            Pagamenti sicuri
          </li>
          <li>
            <img
              src={icons.freeSignUp2}
              alt="Salva i tuoi metodi di pagamento preferiti"
            />
            Salva i tuoi metodi di pagamento preferiti
          </li>
          <li>
            <img
              src={icons.freeSignUp3}
              alt="Vedi la lista dei tuoi pagamenti"
            />
            Vedi la lista dei tuoi pagamenti
          </li>
          <li>
            <img src={icons.freeSignUp4} alt="Pagamento con  QR Code" />
            Pagamento con QR Code
          </li>
        </ul>
      )}
    </div>
  );
};

export default WhySignUp;
