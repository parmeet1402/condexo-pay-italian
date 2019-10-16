import React, { useState } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';
import AccountDetails from './accountDetails';
import PaymentDetails from './paymentDetails';
import UploadDocuments from './uploadDocuments';
import VerifyRegistration from './verifyRegistration';
import RegisterFinalStep from './finalStep';
import { ProgressBar } from '../../../components/ProgressBar';
import { WhySignUp } from '../../../components/WhySignUp';
import './style.scss';
const Register = () => {
  const [activeStep, setActiveStep] = useState(3);

  const showComponent = () => {
    switch (activeStep) {
      case 0:
        return <AccountDetails setActiveStep={setActiveStep} />;
      case 1:
        return <PaymentDetails setActiveStep={setActiveStep} />;
      case 2:
        return <UploadDocuments setActiveStep={setActiveStep} />;
      case 3:
        return <VerifyRegistration setActiveStep={setActiveStep} />;
      case 4:
        return <RegisterFinalStep setActiveStep={setActiveStep} />;
      default:
    }
  };
  const showTitle = () => {
    switch (activeStep) {
      case 0:
        return 'Account details';
      case 1:
        return 'Payment Details';
      case 2:
        return 'Photo I.D.';
      case 3:
        return 'Enter verification code';
      case 4:
        return 'Congratulations and welcome to Condexo Pay!';
      default:
    }
  };
  return (
    <Page>
      <PageContent className="register">
        <div>
          <div className="register-content__container">
            <Logo />
            <div className="progress-bar">
              <ProgressBar totalSteps={5} activeStep={activeStep} />
            </div>
            <h1 className="register-heading">{showTitle()}</h1>
            <div className="register-form__container">{showComponent()}</div>
          </div>
          <WhySignUp activeStep={activeStep} />
        </div>
      </PageContent>
    </Page>
  );
};
export default Register;
