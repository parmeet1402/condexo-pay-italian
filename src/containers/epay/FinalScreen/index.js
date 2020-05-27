import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import icons from '../../../assets/icons';
import './FinalScreen.scss';

const FinalScreen = (props) => {
  const isRechargeSuccessfull = () => props.rechargeStatus === 'success';

  return (
    <div className="final">
      <div className="final-content">
        <h2>
          {isRechargeSuccessfull()
            ? 'Ricarica effettuata correttamente!'
            : 'Qualcosa è andato storto, verifica che i dati inseriti siano corretti.'}
        </h2>
        <img
          src={
            isRechargeSuccessfull()
              ? icons.rechargeSuccess
              : icons.rechargeFailed
          }
          alt="recharge"
        />
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
};

FinalScreen.propTypes = {
  rechargeStatus: PropTypes.oneOf(['success', 'failed']),
  goBack: PropTypes.func,
};

export { FinalScreen };
