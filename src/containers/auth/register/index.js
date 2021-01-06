import React, { useState, useEffect } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';
import AccountDetails from './accountDetails';
import VerifyRegistration from './verifyRegistration';
import LocationDetails from './locationDetails';
import RegisterFinalStep from './finalStep';
import { ProgressBar } from '../../../components/ProgressBar';
import { WhySignUp } from '../../../components/WhySignUp';
import { connect } from 'react-redux';
import UIActions from '../../../redux/UIRedux';
import RegisterActions from '../../../redux/RegisterRedux';
import { MyProfileSelectors } from '../../../redux/MyProfileRedux';
import './style.scss';
const Register = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    props.hideNavbar();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.isRedirectToPaymentsRequested) {
      props.setFormData({ email: props.emailUsedForPurchasing });
    }
  }, [props.isRedirectToPaymentsRequested]);

  useEffect(() => {}, []);
  const showComponent = () => {
    switch (activeStep) {
      case 0:
        return <AccountDetails setActiveStep={setActiveStep} />;
      case 1:
        return <VerifyRegistration setActiveStep={setActiveStep} />;
      case 2:
        return <LocationDetails setActiveStep={setActiveStep} />;
      case 3:
        return <RegisterFinalStep setActiveStep={setActiveStep} />;
      default:
    }
  };
  const showTitle = () => {
    switch (activeStep) {
      case 0:
        return 'Registrazione';
      case 1:
        return 'Inserisci il codice ';
      case 2:
        return 'Registrazione';
      case 3:
        return `Congratulazioni, Benvenuto su Condexo Pay!`;
      default:
    }
  };
  return (
    <Page>
      <PageContent className={`register active-step-${activeStep}`}>
        <div>
          <div className="register-content__container">
            {/* <Logo isDark /> */}
            <div className="progress-bar">
              <ProgressBar totalSteps={4} activeStep={activeStep} />
            </div>
            <h1 className={`register-heading active-step-${activeStep}`}>
              {showTitle()}
            </h1>
            <div
              className={`register-form__container active-step-${activeStep}`}
            >
              {showComponent()}
            </div>
          </div>
          <WhySignUp activeStep={activeStep} />
        </div>
      </PageContent>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  isRedirectToPaymentsRequested: MyProfileSelectors.selectIsRedirectToPaymentsRequested(
    state
  ),
  emailUsedForPurchasing: MyProfileSelectors.selectEmailUsedForPurchasing(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  hideNavbar: () => dispatch(UIActions.hideNavbar()),
  setFormData: (formData) => dispatch(RegisterActions.setFormData(formData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
