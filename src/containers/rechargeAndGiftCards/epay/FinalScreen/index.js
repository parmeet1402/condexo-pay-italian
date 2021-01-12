import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Lottie from 'react-lottie';
import * as successAnimation from '../../../../assets/animations/success.json';
import * as errorAnimation from '../../../../assets/animations/error.json';
import icons from '../../../../assets/icons';
import GuestFinalScreen from './GuestFinalScreen';
import './FinalScreen.scss';

const FinalScreen = (props) => {
  const isRechargeSuccessfull = () => props.rechargeStatus === 'success';
  if (props.user && props.user._id) {
    return (
      <div className="final">
        <div className="final-content">
          <h2>
            {isRechargeSuccessfull()
              ? 'Ricarica effettuata correttamente!'
              : 'Qualcosa è andato storto, verifica che i dati inseriti siano corretti.'}
          </h2>
          {isRechargeSuccessfull() ? (
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: successAnimation.default,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              style={{
                margin: '40px 0 50px',
              }}
              height={150}
              width={150}
            />
          ) : (
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: errorAnimation.default,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              style={{
                margin: '40px 0 50px',
              }}
              height={120}
              width={120}
            />
          )}
          {/*  <img
          src={
            isRechargeSuccessfull()
              ? icons.rechargeSuccess
              : icons.rechargeFailed
          }
          alt="recharge"
        /> */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              if (isRechargeSuccessfull()) {
                props.goToDashboard();
              } else {
                props.goBack();
              }
            }}
          >
            {isRechargeSuccessfull() ? 'Torna alla Home' : 'Inditetro'}
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <GuestFinalScreen
        baseAmount={props.baseAmount}
        selectedCard={props.selectedCard}
        user={props.user}
        cards={props.cards}
        supplier={props.supplier}
        setDataForRedirectionAfterLogin={props.setDataForRedirectionAfterLogin}
        activeEmail={props.activeEmail}
      />
    );
  }
};

FinalScreen.propTypes = {
  rechargeStatus: PropTypes.oneOf(['success', 'failed']),
  goBack: PropTypes.func,
};

export { FinalScreen };
