import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';

import * as successAnimation from '../../../assets/animations/success.json';
import * as errorAnimation from '../../../assets/animations/error.json';

import Button from '../../../components/common/Button';
import history from '../../../utils/history';

import './style.scss';

const PinkButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#d93879',
    border: '0',
    borderColor: '#d93879',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#d93879',
      border: '1px solid',
      boxShadow: 'none',
      color: '#d93879',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      border: '1px solid',
      borderColor: '#d93879',
    },
    '&:focus': {},
  },
})(Button);

const Success = () => {
  return (
    <>
      <h2 className="final-page-gift-card-purchase__heading">
        L’operazione è andata a buon fine!
      </h2>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: successAnimation.default,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={150}
        width={150}
      />
      <p>
        E’ stato effettuato un pagamento di: Ricarica telefonica 10 € a favore
        di WIND
      </p>
      <span>
        Consulta la ricevuta in &nbsp;
        <Link to="/my-payments">I miei pagamenti</Link>
      </span>
      <PinkButton
        style={{
          width: '250px',
          height: '40px',
          marginTop: '52px',
        }}
        onClick={() => {
          history.push('/');
        }}
      >
        Torna alla Home
      </PinkButton>
    </>
  );
};

const Failed = ({ resetIsCompleted, setScreen }) => {
  return (
    <>
      <h2
        style={{ fontSize: '20px' }}
        className="final-page-gift-card-purchase__heading"
      >
        Qualcosa è andato storto, verifica che i dati inseriti siano corretti.
      </h2>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: errorAnimation.default,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={120}
        width={120}
      />
      <PinkButton
        style={{
          width: '250px',
          height: '40px',
          marginTop: '52px',
        }}
        onClick={() => {
          resetIsCompleted();
          setScreen(2);
        }}
      >
        Indietro
      </PinkButton>
    </>
  );
};

const FinalPageGiftCardPurchase = ({
  isSuccess,
  resetIsCompleted,
  setScreen,
}) => {
  return (
    <div className="final-page-gift-card-purchase__container">
      {isSuccess ? (
        <Success />
      ) : (
        <Failed resetIsCompleted={resetIsCompleted} setScreen={setScreen} />
      )}
    </div>
  );
};

export default FinalPageGiftCardPurchase;
