import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { PageContent, Page } from '../../layout';
import { Loader } from '../../../components/Loader';
import FlashMessage from '../../../components/common/FlashMessage';
import { OperatorScreen } from '../OperatorScreen';
import { RechargeScreen } from '../RechargeScreen';
import { PaymentScreen } from '../PaymentScreen';
import { FinalScreen } from '../FinalScreen';
import EpayActions, { EpaySelectors } from '../../../redux/EpayRedux';
import RegisterActions, {
  RegisterSelectors,
} from '../../../redux/RegisterRedux';
import {
  getOperators,
  getMainBrands,
  getOtherBrands,
  getAmounts,
} from '../utils';

const EpayRechargeView = (props) => {
  const [step, setStep] = useState(0);
  const [operator, setOperator] = useState('');
  const [rechargeForm, setRechargeForm] = useState({
    number: '',
    countryCode: '+39',
    confirmNumber: '',
    amount: {
      value: null,
      eanNo: null,
      productName: null,
    },
    optionalEmail: '',
    privacy: false,
  });
  const [card, setCard] = useState('');

  useEffect(() => {
    if (props.rechargeStatus && step === 2) handleStepChange(3);
  }, [props.rechargeStatus]);

  useEffect(() => {
    props.getCountryCodesRequest();
  }, []);

  useEffect(() => {
    return () => {
      props.clearReserveTransId();
      props.clearRechargeStatus();
    };
  }, []);

  useEffect(() => {
    console.log('EpayRechargeView -> props.countryCodes', props.countryCodes);
  }, [props.countryCodes]);
  const getTitle = () =>
    step >= 1 ? 'Ricarica Online' : 'Seleziona il tuo operatore';

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleBackClick = () => {
    if (step === 0) return props.goBack();
    if (step === 2) props.clearReserveTransId();

    handleStepChange(step - 1);
  };

  const handleOperatorChange = (newOperator) => {
    setOperator(newOperator);
    handleRechargeFormChange('amount', { value: null, eanNo: null });
  };

  const handleRechargeFormChange = (name, value) => {
    setRechargeForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePrivacyToggle = () => {
    setRechargeForm((prevState) => ({
      ...prevState,
      privacy: !prevState.privacy,
    }));
  };

  const handleCardChange = (newCard) => {
    setCard(newCard);
  };

  const handleMobileTopup = () => {
    const data = {
      mobile: `${rechargeForm.countryCode} ${rechargeForm.number}`,
      confirmMobile: `${rechargeForm.countryCode} ${rechargeForm.confirmNumber}`,
      eanNo: rechargeForm.amount.eanNo,
      amount: rechargeForm.amount.value,
      acceptPrivacy: true,
    };

    if (rechargeForm.optionalEmail) data.email = rechargeForm.optionalEmail;
    props.mobileTopup(data);
  };

  const handleAddCardAndPay = (data) => {
    const recharge = getRechargeValues();

    props.addCardAndPay(data, recharge);
  };

  const handlePayRecharge = () => {
    const recharge = getRechargeValues();

    props.payRecharge({ ...recharge, paymentSource: card });
  };

  const getRechargeValues = () => {
    const data = {
      mobile: `${rechargeForm.countryCode} ${rechargeForm.number}`,
      eanNo: rechargeForm.amount.eanNo,
      productName: rechargeForm.amount.productName,
      amount: rechargeForm.amount.value,
    };

    if (rechargeForm.optionalEmail) data.email = rechargeForm.optionalEmail;
    return data;
  };

  const handleDeleteCard = (data) => {
    if (card === data.cardId) setCard(null);
    props.deleteCard(data);
  };

  const handleBackFromFinal = () => {
    if (props.rechargeStatus === 'success') {
      props.goBack();
    } else {
      props.clearRechargeStatus();
      handleStepChange(2);
    }
  };
  const handleGoToDashboard = () => {
    props.history.push('/');
  };

  const getComponent = () => {
    switch (step) {
      case 0:
        return (
          <OperatorScreen
            changeStep={handleStepChange}
            selectedOperator={operator}
            changeOperator={handleOperatorChange}
            fetchBrands={props.fetchBrands}
            mainOperators={getMainBrands(props.brands)}
            otherOperators={getOtherBrands(props.brands)}
          />
        );
      case 1:
        return (
          <RechargeScreen
            changeStep={handleStepChange}
            operator={operator}
            rechargeForm={rechargeForm}
            changeRechargeForm={handleRechargeFormChange}
            togglePrivacy={handlePrivacyToggle}
            amounts={getAmounts(operator, props.brands)}
            reserveTransactionId={props.reserveTransactionId}
            isLoading={props.isLoading}
            mobileTopup={handleMobileTopup}
            getCountryCodesRequest={props.getCountryCodesRequest}
            countryCodes={props.countryCodes}
          />
        );
      case 2:
        return (
          <PaymentScreen
            changeStep={handleStepChange}
            cards={props.cards}
            fetchCards={props.fetchCards}
            selectedCard={card}
            changeCard={handleCardChange}
            addCardAndPay={handleAddCardAndPay}
            isLoading={props.isLoading}
            payRecharge={handlePayRecharge}
            deleteCard={handleDeleteCard}
            destroyReserveTransId={props.clearReserveTransId}
          />
        );
      case 3:
        return (
          <FinalScreen
            rechargeStatus={props.rechargeStatus}
            goBack={handleBackFromFinal}
            goToDashboard={handleGoToDashboard}
          />
        );
      default:
    }
  };

  return (
    <Page>
      <PageContent className="epay-page">
        <div className="epay-page-content">
          {props.isLoading && <Loader belowNavbar />}
          <div className="epay-page-header">
            <h1>{getTitle()}</h1>
            {step !== 3 && (
              <button onClick={handleBackClick}>
                <span>&larr;</span>
                <span>Indietro</span>
              </button>
            )}
          </div>
        </div>
        <div>{getComponent()}</div>
        {props.error && (
          <FlashMessage
            hideFlashMessage={props.clearMessages}
            message={props.error}
            variant={props.error ? 'warning' : 'success'}
          />
        )}
      </PageContent>
    </Page>
  );
};

EpayRechargeView.propTypes = {
  goBack: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      amounts: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
          eanNo: PropTypes.string,
        })
      ),
      icon: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state) => ({
  isLoading: EpaySelectors.selectIsLoading(state),
  error: EpaySelectors.selectError(state),
  brands: getOperators(EpaySelectors.selectBrands(state)),
  cards: EpaySelectors.selectCards(state),
  reserveTransactionId: EpaySelectors.selectReserveTransactionId(state),
  rechargeStatus: EpaySelectors.selectRechargeStatus(state),
  countryCodes: RegisterSelectors.selectCountryCodes(state),
});

const EpayRecharge = connect(mapStateToProps, {
  fetchBrands: EpayActions.getBrandsRequest,
  clearMessages: EpayActions.clearMessages,
  fetchCards: EpayActions.getCardsRequest,
  mobileTopup: EpayActions.mobileTopupRequest,
  clearReserveTransId: EpayActions.clearReserveTransId,
  addCardAndPay: EpayActions.addCardAndPayRequest,
  payRecharge: EpayActions.payRechargeRequest,
  deleteCard: EpayActions.deleteCardRequest,
  clearRechargeStatus: EpayActions.clearRechargeStatus,
  getCountryCodesRequest: RegisterActions.getCountryCodesRequest,
})(EpayRechargeView);

export { EpayRecharge };
