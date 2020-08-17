import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Button, Radio, IconButton } from '@material-ui/core';
import { Close, ChevronRight } from '@material-ui/icons';
import cn from 'classnames';
import { Formik } from 'formik';
import { Elements } from 'react-stripe-elements';
import EpayActions, { EpaySelectors } from '../../../redux/EpayRedux';
import MyProfileActions, {
  MyProfileSelectors,
} from '../../../redux/MyProfileRedux';
import AddCardForm from './addCardForm';
import validationSchema from './schema';

// import validationSchema from './schema';
import {
  epayVisa,
  epayMasterCard,
  epayGenericCard,
} from '../../../assets/images';
import { topUpGiftCardRequest } from '../../../redux/GiftCardRedux';
import './style.scss';
const Payment = ({
  fetchCards,
  changeCard,
  cards,
  deleteCard,
  topUpGiftCardRequest,
  setScreen,
  isCompleted,
  addProfileCardRequest,
  successMessage,
  selectedCard,
  setCard,
  ...restProps
}) => {
  useEffect(() => {
    // topUpGiftCardRequest({});
    fetchCards();
  }, []);
  // const [selectedCard, setCard] = useState('');

  const handleCardChange = ({ target }) => {
    console.log(target.value);
    setCard(target.value);
  };
  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'visa':
        return epayVisa;
      case 'mastercard':
        return epayMasterCard;
      default:
        return epayGenericCard;
    }
  };
  const padStars = (cardNumber) => `**** **** **** ${cardNumber}`;

  const getUserCards = () =>
    (cards || []).map((card) => (
      <div className="payment-card" key={card._id}>
        <Radio
          value={card.stripeCardId}
          checked={selectedCard === card.stripeCardId}
          onChange={handleCardChange}
          color="primary"
          size="medium"
        />
        <img src={getIcon(card.cardType)} alt={card.cardType} />
        <div className="payment-card-details">
          <span>{card.nameOnCard}</span>
          <span>{padStars(card.cardNumber)}</span>
          <span>
            Valido fino al {card.expiryMonth}/{card.expiryYear}
          </span>
        </div>
        <IconButton
          onClick={() =>
            deleteCard({
              cardId: card._id,
              stripeCardId: card.stripeCardId,
            })
          }
        >
          <Close />
        </IconButton>
      </div>
    ));

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

  const GreyButton = withStyles({
    root: {
      color: '#a4abb5',
      backgroundColor: '#fff',
      border: 'solid 1px #a4abb5',
      borderRadius: 0,
      fontWeight: 'normal',

      '&:hover': {
        backgroundColor: '#fff',
        borderColor: '#a4abb5',
        border: '1px solid',
        boxShadow: 'none',
        color: '#a4abb5',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#fff',
        border: '1px solid',
        borderColor: '#a4abb5',
      },
      '&:focus': {},
    },
  })(Button);

  useEffect(() => {
    if (isCompleted) {
      setScreen(3);
    }
  }, [isCompleted]);

  return (
    <div className="payment">
      <div className="payment-content">{getUserCards()}</div>
      <div
        className={cn('payment-card payment-card--lean', {
          'no-border': selectedCard === 'new',
        })}
      >
        <Radio
          value="new"
          checked={selectedCard === 'new'}
          onChange={handleCardChange}
          color="primary"
          size="medium"
        />
        <p>Nuova carta di credito</p>
        <ChevronRight
          className={cn('payment-chevron', {
            'payment-chevron--rotate': selectedCard === 'new',
          })}
        />
      </div>
      {selectedCard === 'new' && (
        <Elements>
          <>
            <Formik
              render={(props) => (
                <AddCardForm
                  {...props}
                  goBack={() => setScreen(1)}
                  topUpGiftCardRequest={topUpGiftCardRequest}
                  addProfileCardRequest={addProfileCardRequest}
                  successMessage={successMessage}
                />
              )}
              initialValues={{ name: '' }}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={(values, actions) => {}}
              validationSchema={validationSchema}
            />
          </>
        </Elements>
      )}
      {selectedCard !== 'new' && (
        <div className="payment-card__footer">
          <GreyButton
            style={{
              width: '121px',
              height: '42px',
            }}
            onClick={() => setScreen(1)}
          >
            Indietro
          </GreyButton>
          <PinkButton
            style={{
              width: '131px',
              height: '42px',
              // marginTop: '52px',
            }}
            onClick={() =>
              topUpGiftCardRequest({ paymentSource: selectedCard })
            }
          >
            Procedi
          </PinkButton>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cards: EpaySelectors.selectCards(state),
  successMessage: MyProfileSelectors.selectSuccessMessage(state),
});
const mapDispatchToProps = (dispatch) => ({
  fetchCards: (data) => dispatch(EpayActions.getCardsRequest(data)),
  addProfileCardRequest: (data) =>
    dispatch(MyProfileActions.addProfileCardRequest(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
