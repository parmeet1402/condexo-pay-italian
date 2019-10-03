import React, { useState } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import AccountDetails from './accountDetails';
import PaymentDetails from './paymentDetails';
import UploadDocuments from './uploadDocuments';
import VerifyRegistration from './verifyRegistration';
import { ProgressBar } from '../../../components/ProgressBar';
import { WhySignUp } from '../../../components/WhySignUp';
import './style.scss';
const Register = () => {
  const [activeStep, setActiveStep] = useState(3);
  /* let formData = new FormData();
  const addToFormData = data => {
    Object.keys(data).forEach(key => formData.set(key, data[key]));
  }; */
  const showComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <AccountDetails
            setActiveStep={setActiveStep}
            /* addToFormData={addToFormData}
            formData={{ ...formData.values() }} */
          />
        );
      case 1:
        return (
          <PaymentDetails
            setActiveStep={setActiveStep}
            /* addToFormData={addToFormData}
            formData={{ ...formData.values() }} */
          />
        );
      case 2:
        return (
          <UploadDocuments
            setActiveStep={setActiveStep}
            /* addToFormData={addToFormData}
            formData={{ ...formData.values() }} */
          />
        );
      case 3:
        return (
          <VerifyRegistration
            setActiveStep={setActiveStep}
            /* addToFormData={addToFormData}
            formData={{ ...formData.values() }} */
          />
        );
      default:
    }
  };
  const showTitle = () => {
    switch (activeStep) {
      case 0:
        return 'Account Details';
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
          <WhySignUp />
        </div>
      </PageContent>
    </Page>
  );
};
export default Register;
