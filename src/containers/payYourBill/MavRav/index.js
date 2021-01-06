import React, { useEffect } from 'react';

// Components
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from '../Bollettino/stepThree';
import StepFour from '../Bollettino/stepFour';

// Redux
import history from '../../../utils/history';
import { connect } from 'react-redux';
import PayYourBillActions, {
  PayYourBillSelectors,
} from '../../../redux/PayYourBillRedux';
import EpayActions, { EpaySelectors } from '../../../redux/EpayRedux';
import MyProfileActions from '../../../redux/MyProfileRedux';
import AuthActions, { AuthSelectors } from '../../../redux/AuthRedux';

// Utils
import { getTotalInclusiveOfCommissionsAndPaytipper } from '../../../utils/commissions';
import { mergeAndFormatAmount } from '../../../utils/currency';

// Stylesheet
import './style.scss';

const MavRav = ({
  activeVariant,
  activeStep,
  setActiveStep,
  mavRavState,
  setMavRavKey,
  rataState,
  setRataKey,
  // TODO: data key and setter value
  cards,
  fetchCardsRequest,
  addCardRequest,
  deleteCardRequest,
  user,
  reserveBillRequest,
  reserveTransactionId,
  makeBillRequest,
  successMessage,
  receiptLink,
  setDataForRedirectionAfterLogin,
}) => {
  /*   const reserveBill = (data) => {
    // if user then only send userId
    let userId = '';
    if (user && user._id) {
      userId = user._id;
    }
    const obj = {
      ...(userId && { userId }),
      mobile: mavRavState.stepTwo.mobileNo,
      firstName: mavRavState.stepTwo.name,
      surname: mavRavState.stepTwo.surname,
      email: mavRavState.stepTwo.email,
      billType: mavRavState.stepOne.mode,
      amount: getTotalInclusiveOfCommissionsAndPaytipper(
        mavRavState.stepOne.amountToLeftOfDecimal,
        mavRavState.stepOne.amountToRightOfDecimal
      ),
      billId:
        activeVariant === 'mav'
          ? mavRavState.stepOne.mavCode
          : mavRavState.stepOne.ravCode,
    };
    reserveBillRequest(obj);
  }; */

  const goStepAhead = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };
  const goStepBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };
  const exitFlow = () => {
    history.push('/dashboard');
  };
  console.log('activeStep === 0', activeStep === 0);

  useEffect(() => {
    if (successMessage === 'Pagamento della bolletta riuscito') {
      goStepAhead();
    }
  }, [successMessage]);

  return (
    <div className={`pay-your-bill__content ${activeVariant}`}>
      {activeStep === 0 && (
        <StepOne
          activeVariant={activeVariant}
          data={mavRavState.stepOne}
          handleChange={setMavRavKey}
          goStepAhead={goStepAhead}
        />
      )}
      {activeStep === 1 && (
        <StepTwo
          activeVariant={activeVariant}
          data={mavRavState.stepTwo}
          handleChange={setMavRavKey}
          goStepBack={goStepBack}
          goStepAhead={goStepAhead}
          amount={{
            amountToLeftOfDecimal: mavRavState.stepOne.amountToLeftOfDecimal,
            amountToRightOfDecimal: mavRavState.stepOne.amountToRightOfDecimal,
            last4Digits: mavRavState.stepTwo.last4Digits,
          }}
          reserveBillRequest={reserveBillRequest}
          reserveTransactionId={reserveTransactionId}
        />
      )}
      {activeStep === 2 && (
        <StepThree
          user={user}
          activeVariant={activeVariant}
          setActiveStep={setActiveStep}
          cards={cards}
          fetchCardsRequest={fetchCardsRequest}
          addCardRequest={addCardRequest}
          deleteCardRequest={deleteCardRequest}
          data={mavRavState.stepThree}
          handleChange={setMavRavKey}
          goStepAhead={goStepAhead}
          goStepBack={goStepBack}
          amount={{
            amountToLeftOfDecimal: mavRavState.stepOne.amountToLeftOfDecimal,
            amountToRightOfDecimal: mavRavState.stepOne.amountToRightOfDecimal,
            last4Digits: mavRavState.stepThree.last4Digits,
          }}
          makeBillRequest={makeBillRequest}
        />
      )}
      {activeStep === 3 && (
        <StepFour
          activeVariant={activeVariant}
          data={{
            type: mavRavState.stepOne.mode === 'mav' ? 'MAV' : 'RAV',
            cardNo: mavRavState.stepThree.last4Digits,
            amount: mergeAndFormatAmount(
              mavRavState.stepOne.amountToLeftOfDecimal,
              mavRavState.stepOne.amountToRightOfDecimal
            ),
            billNo:
              mavRavState.stepOne.mode === 'mav'
                ? mavRavState.stepOne.mavCode
                : mavRavState.stepOne.ravCode,
            firstName: mavRavState.stepTwo.name,
            surname: mavRavState.stepTwo.surname,
            desc: '',
            email: mavRavState.stepTwo.email,
          }}
          receiptLink={receiptLink}
          setDataForRedirectionAfterLogin={setDataForRedirectionAfterLogin}
          user={user}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: PayYourBillSelectors.selectIsLoading(state),
  successMessage: PayYourBillSelectors.selectSuccessMessage(state),
  errorMessage: PayYourBillSelectors.selectErrorMessage(state),
  rataState: PayYourBillSelectors.selectRataState(state),
  mavRavState: PayYourBillSelectors.selectMavRavState(state),
  cards: EpaySelectors.selectCards(state),
  user: AuthSelectors.selectCurrentUser(state),
  reserveTransactionId: PayYourBillSelectors.selectReserveTransactionId(state),
  receiptLink: PayYourBillSelectors.selectReceiptLink(state),
});

const mapDispatchToProps = (dispatch) => ({
  setMavRavKey: (stepCount, key, value) =>
    dispatch(PayYourBillActions.setMavRavKey(stepCount, key, value)),
  setRataKey: (stepCount, key, value) =>
    dispatch(PayYourBillActions.setRataKey(stepCount, key, value)),
  fetchCardsRequest: (data) => dispatch(EpayActions.getCardsRequest(data)),
  addCardRequest: (data) =>
    dispatch(MyProfileActions.addProfileCardRequest(data)),
  deleteCardRequest: (data) =>
    dispatch(MyProfileActions.deleteProfileCardRequest(data)),
  reserveBillRequest: () => dispatch(PayYourBillActions.reserveBillRequest()),
  makeBillRequest: (data) => dispatch(PayYourBillActions.makeBillRequest(data)),
  setDataForRedirectionAfterLogin: (email) =>
    dispatch(MyProfileActions.setDataForRedirectionAfterLogin(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MavRav);

/* mav flow */
// step - 1 - common
// step 2
/* Rav flow */
// step - 1 - common

// MAV/RAV flow
// 1.
// Codice MAV (17 complusory)
// Codice RAV (17 complusory)
// Importo - amount of payment

// 2.
// Name (nome)
// surname ora company name (Congome or Ragion sociale)
// Mobile Number (Cellulare)
// Email

// 3. payment
// 4. Confirmation popup

// Rata flow
// 1.
// Codice MAV (17 complusory)
// Codice RAV (17 complusory)
// Importo - amount of payment

// 2.
// Name (nome)
// surname ora company name (Congome or Ragion sociale)
// Mobile Number (Cellulare)
// Email
// Condo manager email (Optional)
