import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PersonalDetails from './personalDetails';
import Payment from './payment';
import GiftCardActions, {
  GiftCardSelectors,
  topUpGiftCardRequest,
} from '../../redux/GiftCardRedux';
import UIActions from '../../redux/UIRedux';
import { EpaySelectors } from '../../redux/EpayRedux';
import Sidebar from './sidebar';
import { Page, PageContent } from '../layout';
import { stringToCurrency } from '../../utils/currency';
import history from '../../utils/history';
import FinalPageGiftCardPurchase from './finalPage';
import isEmpty from 'lodash/isEmpty';
import { Loader } from '../../components/Loader';

import './style.scss';
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
      history.push('/epay');
    }
  }, [activeGiftCard]);

  const [activeAmount, setActiveAmount] = useState(
    topUpGiftCardRequestObj.amount
      ? topUpGiftCardRequestObj.amount
      : parseInt(match.params.amount)
      ? parseFloat(match.params.amount)
      : 5
  );
  const [screen, setScreen] = useState(1);
  // if its present in redux
  // if not then check params
  // if its 0 then hide it
  useEffect(() => {
    console.log(parseInt(match.params.amount));
    if (topUpGiftCardRequestObj.amount) {
      setActiveAmount(topUpGiftCardRequestObj.amount);
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
          {(isLoadingEP || isLoadingGC) && <Loader belowNavbar />}
          {!(screen > 2) && (
            <button onClick={goBack}>
              <span>&larr;</span>
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
              resetIsCompleted={resetIsCompleted}
            />
          ) : (
            <>
              <Sidebar
                className="gift-card-purchase__content__sidebar"
                logo={logo}
                supplier={supplier}
                isVariable={activeProduct.faceValue === 0}
                amount={stringToCurrency(activeAmount)}
              />
              <div className="gift-card-purchase__content__main">
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
  // appendTopUpGiftCardRequestObj: GiftCardSelectors
});
const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
  appendTopUpGiftCardRequestObj: (data) =>
    dispatch(GiftCardActions.appendTopUpGiftCardRequestObj(data)),
  topUpGiftCardRequest: (data) =>
    dispatch(GiftCardActions.topUpGiftCardRequest(data)),
  resetIsCompleted: () => dispatch(GiftCardActions.resetIsCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCardPurchase);
