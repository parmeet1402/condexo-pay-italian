import React, { useState, useEffect } from 'react';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import history from '../../../utils/history';
import { connect } from 'react-redux';
import PayYourBillActions, {
  PayYourBillSelectors,
} from '../../../redux/PayYourBillRedux';
import EpayActions, { EpaySelectors } from '../../../redux/EpayRedux';
import MyProfileActions, {
  MyProfileSelectors,
} from '../../../redux/MyProfileRedux';
import AuthActions, { AuthSelectors } from '../../../redux/AuthRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { mergeAndFormatAmount } from '../../../utils/currency';
import './style.scss';

const Bollettino = ({
  activeVariant,
  activeStep,
  setActiveStep,
  makeScanCodeVisible,
  bollettinoState: {
    stepOne: stepOneState,
    stepTwo: stepTwoState,
    stepThree: stepThreeState,
  },
  cards,
  setBollettinoKey,
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
  myProfileSuccessMessage,
}) => {
  const goStepAhead = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };
  const goStepBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };
  const exitFlow = () => {
    history.push('/dashboard');
  };
  const bollettinoTypes = [
    { value: '123', label: '123 - Bianco' },
    { value: '451', label: '451 - Bianco personalizzato' },
    { value: '674', label: '674 - Premarcato non fatturatore' },
    { value: '896', label: '896 - Premarcato fatturatore' },
  ];

  const getPaymentType = () => {
    const index = bollettinoTypes.findIndex(
      (item) => item.value === stepOneState.type
    );
    if (index >= 0) {
      return bollettinoTypes[index].label;
    }

    return '';
  };

  useEffect(() => {
    if (successMessage === 'Pagamento della bolletta riuscito') {
      goStepAhead();
    }
  }, [successMessage]);

  return (
    <>
      {['896'].some((item) => item === stepOneState.type) && activeStep === 0 && (
        <div
          className="pay-your-bill__scan-code-banner"
          onClick={makeScanCodeVisible}
        >
          <span className="pay-your-bill__scan-code-banner__label">
            Effettua il pagamento scannerizzando il codice!
          </span>
          <div className="pay-your-bill__scan-code-banner__icon__container">
            <FontAwesomeIcon
              icon={faCamera}
              className="pay-your-bill__scan-code-banner__icon"
            />
          </div>
        </div>
      )}
      <div className="pay-your-bill__content bollettino">
        {activeStep === 0 && (
          <StepOne
            types={bollettinoTypes}
            data={stepOneState}
            handleChange={setBollettinoKey}
            goStepAhead={goStepAhead}
          />
        )}
        {activeStep === 1 && (
          <StepTwo
            activeVariant={activeVariant}
            data={stepTwoState}
            handleChange={setBollettinoKey}
            goStepAhead={goStepAhead}
            goStepBack={goStepBack}
            amount={{
              amountToLeftOfDecimal: stepOneState.amountToLeftOfDecimal,
              amountToRightOfDecimal: stepOneState.amountToRightOfDecimal,
              last4Digits: stepThreeState.last4Digits,
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
            data={stepThreeState}
            handleChange={setBollettinoKey}
            goStepAhead={goStepAhead}
            goStepBack={goStepBack}
            amount={{
              amountToLeftOfDecimal: stepOneState.amountToLeftOfDecimal,
              amountToRightOfDecimal: stepOneState.amountToRightOfDecimal,
              last4Digits: stepThreeState.last4Digits,
            }}
            makeBillRequest={makeBillRequest}
            myProfileSuccessMessage={myProfileSuccessMessage}
          />
        )}
        {activeStep === 3 && (
          <StepFour
            activeVariant={activeVariant}
            data={{
              type: getPaymentType(),
              cardNo: stepThreeState.last4Digits,
              accountNo: stepOneState.accountNo,
              code: stepOneState.code,
              amount: mergeAndFormatAmount(
                stepOneState.amountToLeftOfDecimal,
                stepOneState.amountToRightOfDecimal
              ),
              billNo: stepOneState.code,
              firstName: stepTwoState.name,
              surname: stepTwoState.surname,
              desc: stepOneState.desc,
              email: stepTwoState.email,
            }}
            receiptLink={receiptLink}
            setDataForRedirectionAfterLogin={setDataForRedirectionAfterLogin}
            user={user}
            // types={bollettinoTypes}
          />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  isLoading: PayYourBillSelectors.selectIsLoading(state),
  successMessage: PayYourBillSelectors.selectSuccessMessage(state),
  errorMessage: PayYourBillSelectors.selectErrorMessage(state),
  bollettinoState: PayYourBillSelectors.selectBollettinoState(state),
  cards: EpaySelectors.selectCards(state),
  user: AuthSelectors.selectCurrentUser(state),
  reserveTransactionId: PayYourBillSelectors.selectReserveTransactionId(state),
  receiptLink: PayYourBillSelectors.selectReceiptLink(state),
  myProfileSuccessMessage: MyProfileSelectors.selectSuccessMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setBollettinoKey: (stepCount, key, value) =>
    dispatch(PayYourBillActions.setBollettinoKey(stepCount, key, value)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Bollettino);
