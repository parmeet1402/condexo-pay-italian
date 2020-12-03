import React from 'react';
import Commission from '../../../../components/Commission';
import Lottie from 'react-lottie';
import * as successAnimation from '../../../../assets/animations/success.json';
import Button from '../../../../components/common/Button';
import history from '../../../../utils/history';
import { withStyles } from '@material-ui/core/styles';

const LightBlueButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#4a90e2',
    border: '1px solid',
    borderColor: '#4a90e2',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#4a90e2',
      boxShadow: 'none',
      color: '#4a90e2',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#4a90e2',
    },
    '&:focus': {},
  },
})(Button);
const GuestFinalScreen = ({
  baseAmount,
  selectedCard,
  user,
  cards,
  supplier,
}) => {
  return (
    <div className="final guest">
      <div className="final-content">
        <h2>L’operazione è andata a buon fine!</h2>
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
            margin: '40px 0 40px',
          }}
          height={96}
          width={96}
        />
        <p>
          {supplier || 'WIND TRE'}
          &nbsp;accrediterà la ricarica entro 24h. Per info contatta il 159
        </p>
        <p>Fai login per visualizzare le ricevute dei tuoi pagamenti</p>
        <LightBlueButton
          variant="contained"
          color="primary"
          fullWidth
          style={{ width: '250px', height: '40px', marginTop: '52px' }}
          onClick={() => history.push('/')}
        >
          {'Accedi'}
        </LightBlueButton>
      </div>
      <Commission
        baseAmount={baseAmount}
        last4Digits={
          selectedCard && selectedCard !== 'new' && user && user._id
            ? cards[
                cards.findIndex((card) => card.stripeCardId === selectedCard)
              ].cardNumber
            : ''
        }
        typeOfPayment="Ricarica Telefonica"
      />
    </div>
  );
};

export default GuestFinalScreen;
