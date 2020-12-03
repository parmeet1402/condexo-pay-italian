import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PersonalDetails from './personalDetails';
import Payment from './payment';
import GiftCardActions, {
  GiftCardSelectors,
  topUpGiftCardRequest,
} from '../../redux/GiftCardRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UIActions from '../../redux/UIRedux';
import { EpaySelectors } from '../../redux/EpayRedux';
import { AuthSelectors } from '../../redux/AuthRedux';

import Sidebar from './sidebar';
import { Page, PageContent } from '../layout';
import { stringToCurrency } from '../../utils/currency';
import { getTotalInclusiveOfCommissions } from '../../utils/commissions';

import history from '../../utils/history';
import FinalPageGiftCardPurchase from './finalPage';
import isEmpty from 'lodash/isEmpty';
import { Loader } from '../../components/Loader';

import './style.scss';
import { MyProfileSelectors } from '../../redux/MyProfileRedux';
const GiftCardPurchase = ({
  activeGiftCard,
  activeProduct,
  showNavbar,
  appendTopUpGiftCardRequestObj,
  topUpGiftCardRequestObj,
  match,
  topUpGiftCardRequest,
  isCompleted,
  successMessage,
  resetIsCompleted,
  isLoadingEP,
  isLoadingGC,
  isLoadingAC,
  activeAmount,
  setActiveAmount,
  cards,
  resetBackToInitialState,
  isNewUser,
  user,
  ...restProps
}) => {
  const { logo, supplier } = !isEmpty(activeGiftCard) ? activeGiftCard : {};
  useEffect(() => {
    showNavbar();
  }, []);

  const goBack = () => {
    if (screen === 1) {
      history.goBack();
    } else {
      setScreen(screen - 1);
    }
  };
  useEffect(() => {
    if (isEmpty(activeGiftCard)) {
      history.push('/ricariche');
    }
  }, [activeGiftCard]);

  /* const [activeAmount, setActiveAmount] = useState(
    topUpGiftCardRequestObj.amount
      ? topUpGiftCardRequestObj.amount
      : parseInt(match.params.amount)
      ? parseFloat(match.params.amount)
      : 5
  ); */
  useEffect(() => {
    /* if (
      !isEmpty(topUpGiftCardRequestObj) &&
      topUpGiftCardRequestObj.amount !== 0
    ) {
      setActiveAmount(topUpGiftCardRequestObj.amount);
    } else if (match.params.amount) {
      setActiveAmount(parseFloat(match.params.amount));
    } else {
      setActiveAmount(5);
    } */
    if (activeProduct.faceValue === 0) {
      if (
        !isEmpty(topUpGiftCardRequestObj) &&
        topUpGiftCardRequestObj.amount !== 0
      ) {
        setActiveAmount(topUpGiftCardRequestObj.amount);
      } else {
        setActiveAmount(5);
      }
    } else if (match.params.amount) {
      setActiveAmount(parseFloat(match.params.amount));
    }
  }, [topUpGiftCardRequestObj]);

  const [screen, setScreen] = useState(1);
  const [selectedCard, setCard] = useState('');

  // if its present in redux
  // if not then check params
  // if its 0 then hide it
  useEffect(() => {
    console.log(parseInt(match.params.amount));
    if (topUpGiftCardRequestObj.amount) {
      // setActiveAmount(topUpGiftCardRequestObj.amount);
      // } else if (!parseInt(match.params.amount)) {
      // setActiveAmount(parseFloat(match.params.amount));
      // } else {
      // setActiveAmount(parseFloat(match.params.amount));
    }
    console.log(match.params.amount);
  }, [match]);
  return (
    <Page>
      <PageContent className="gift-card-purchase">
        <div className="gift-card-purchase__header">
          {(isLoadingEP || isLoadingGC || isLoadingAC) && (
            <Loader belowNavbar />
          )}
          {!(screen > 2) && (
            <button onClick={goBack}>
              {/* <span>&larr;</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-left"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="#0357d3"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="5" y1="12" x2="11" y2="18" />
                <line x1="5" y1="12" x2="11" y2="6" />
              </svg>

              <span>Indietro</span>
            </button>
          )}
          <h1>{screen > 2 ? 'Ricarica Online' : 'Acquista la tua giftcard'}</h1>
        </div>
        <div className="gift-card-purchase__content">
          {screen > 2 ? (
            <FinalPageGiftCardPurchase
              isSuccess={successMessage}
              setScreen={setScreen}
              isUser={user && user._id}
              resetIsCompleted={resetIsCompleted}
              supplier={activeGiftCard.supplier}
              amount={stringToCurrency(
                getTotalInclusiveOfCommissions(activeAmount)
              )}
              resetBackToInitialState={resetBackToInitialState}
            />
          ) : (
            <>
              <Sidebar
                className="gift-card-purchase__content__sidebar"
                logo={logo}
                supplier={supplier}
                isVariable={activeProduct.faceValue === 0}
                amount={activeAmount}
                last4Digits={
                  selectedCard && selectedCard !== 'new' && user && user._id
                    ? cards[
                        cards.findIndex(
                          (card) => card.stripeCardId === selectedCard
                        )
                      ].cardNumber
                    : ''
                }
                selectedCard={selectedCard}
              />
              <div
                className={`gift-card-purchase__content__main ${
                  screen === 2 ? 'payment-main' : ''
                }`}
              >
                {/* <FinalPageGiftCardPurchase isSuccess={true} /> */}

                {screen === 1 ? (
                  <PersonalDetails
                    supplier={supplier}
                    activeProduct={activeProduct}
                    appendTopUpGiftCardRequestObj={
                      appendTopUpGiftCardRequestObj
                    }
                    initialAmount={match.params.amount}
                    activeAmount={activeAmount}
                    setActiveAmount={setActiveAmount}
                    setScreen={setScreen}
                    topUpGiftCardRequestObj={topUpGiftCardRequestObj}
                  />
                ) : (
                  <Payment
                    topUpGiftCardRequest={topUpGiftCardRequest}
                    setScreen={setScreen}
                    isCompleted={isCompleted}
                    selectedCard={selectedCard}
                    setCard={setCard}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </PageContent>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  activeProduct: GiftCardSelectors.selectActiveProduct(state),
  activeGiftCard: GiftCardSelectors.selectActiveGiftCard(state),
  topUpGiftCardRequestObj: GiftCardSelectors.selectTopUpGiftCardRequestObj(
    state
  ),
  isCompleted: GiftCardSelectors.selectIsCompleted(state),
  successMessage: GiftCardSelectors.selectSuccessMessage(state),
  isLoadingGC: GiftCardSelectors.selectIsLoading(state),
  isLoadingEP: EpaySelectors.selectIsLoading(state),
  isLoadingAC: MyProfileSelectors.selectIsLoading(state),
  activeAmount: GiftCardSelectors.selectActiveAmount(state),
  cards: EpaySelectors.selectCards(state),
  user: AuthSelectors.selectCurrentUser(state),

  // appendTopUpGiftCardRequestObj: GiftCardSelectors
});
const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
  appendTopUpGiftCardRequestObj: (data) =>
    dispatch(GiftCardActions.appendTopUpGiftCardRequestObj(data)),
  topUpGiftCardRequest: (data) =>
    dispatch(GiftCardActions.topUpGiftCardRequest(data)),
  resetIsCompleted: () => dispatch(GiftCardActions.resetIsCompleted()),
  setActiveAmount: (amount) =>
    dispatch(GiftCardActions.setActiveAmount(amount)),
  resetBackToInitialState: () =>
    dispatch(GiftCardActions.resetBackToInitialState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardPurchase);
