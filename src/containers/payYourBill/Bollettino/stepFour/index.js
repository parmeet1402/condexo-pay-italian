import React, { useEffect } from 'react';
import history from '../../../../utils/history';
import images from '../../../../assets/icons';
import { stringToCurrency } from '../../../../utils/currency';
// import Button from '../../../../components/common/Button';
import Button from '@material-ui/core/Button';
import SidebarAlert from '../../SidebarAlert';

import { withStyles } from '@material-ui/core/styles';

const OrangeButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#ff7330',
    border: '1px solid',
    borderColor: '#ff7330',
    borderRadius: 4,
    fontWeight: 'normal',
    padding: '8px 32px',
    marginTop: '32px',

    '&:hover': {
      backgroundColor: '#ff7330',
      borderColor: '#ff7330',
      boxShadow: 'none',
      color: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#ff7330',
      borderColor: '#ff7330',
      color: '#fff',
    },
    '&:focus': {} /* 674 – Premarcato non fatturatore
    Numero C/C
    **** **** **** 34567654356789765
    Codice bollettino
    28928763782983767829
    Numero C/C
    Bolletta numero 5678
    IMPORTO
    300 */,
  },
})(Button);

const Card = ({ /* type, cardNo, code, amount,  billNo,*/ activeVariant }) => {
  const isBollettino = activeVariant === 'bollettini';
  const data = {
    type: '674 – Premarcato non fatturatore',
  };
  const type = '674 – Premarcato non fatturatore';
  const cardNo = '34567654356789765';
  const code = '28928763782983767829';
  const amount = '300.00';
  const billNo = 'Bolletta numero 5678';
  const firstName = 'Serena';
  const lastName = 'Quaglia';
  return (
    <div className="bollettino-page__step-four__card scroll-element">
      <div className="bollettino-page__step-four__card__icon">
        <img
          src={
            activeVariant === 'mav-rav'
              ? images.mavRav
              : activeVariant === 'rata'
              ? images.rate
              : images.bollettini
          }
          alt={
            activeVariant === 'mav-rav'
              ? 'MAV/RAV'
              : activeVariant === 'rata'
              ? 'Rata'
              : 'bollettini'
          }
        />
      </div>
      <h2>Riepilogo bollettino</h2>
      <div className="bollettino-page__step-four__card__row">
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Tipologia di bollettino
          </div>
          <div className="bollettino-page__step-four__card__value">{type}</div>
        </div>
        {/*         <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Eseguito da
          </div>
          <div className="bollettino-page__step-four__card__value">{`${firstName} ${lastName}`}</div>
        </div> */}
      </div>
      <div className="bollettino-page__step-four__card__row">
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Numero C/C
          </div>
          <div className="bollettino-page__step-four__card__value">
            {cardNo}
          </div>
        </div>
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">
            Codice bollettino
          </div>
          <div className="bollettino-page__step-four__card__value">{code}</div>
        </div>
      </div>
      <div className="bollettino-page__step-four__card__row">
        <div className="bollettino-page__step-four__card__item">
          <div className="bollettino-page__step-four__card__label">Causale</div>
          <div className="bollettino-page__step-four__card__value">
            {billNo}
          </div>
        </div>
      </div>
      <div className="bollettino-page__step-four__card__item total">
        <div className="bollettino-page__step-four__card__label">Importo</div>
        <div className="bollettino-page__step-four__card__value">{`${amount} €`}</div>
      </div>
    </div>
  );
};

const StepFour = ({
  data: { type, cardNo, code, amount, billNo } = {},
  activeVariant,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToPayments = () => {
    history.push('/miei_pagamenti');
  };

  return (
    <div className="bollettino-page__step-four">
      <h1>Pagamento avvenuto con successo!</h1>
      {/* <OrangeButton onClick={goToPayments}>Vai a I MIEI PAGAMENTI</OrangeButton> */}
      <div className="content">
        {/* <div className="scroller"> */}
        <Card
          activeVariant={activeVariant}
          type={type ?? '674 – Premarcato non fatturatore'}
          cardNo={cardNo ?? '34567654356789765'}
          code={code ?? '28928763782983767829'}
          amount={amount ?? '300'}
          billNo={billNo ?? 'Bolletta numero 5678'}
        />
        {/* </div> */}
        <SidebarAlert />
      </div>
      <p
        className="bollettino-page__step-four__link"
        /*        style={{
          color: '#1a315b',
          fontSize: '20px',
          textDecoration: 'underline',
        }} */
      >
        Clicca qui per vedere tutti i tuoi pagamenti e gli acquisti
      </p>
    </div>
  );
};

export default StepFour;
