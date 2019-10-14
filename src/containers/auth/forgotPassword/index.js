import React, { useState } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import PasswordRecovery from './PasswordRecovery';
import VerifyPasswordReset from './VerifyPasswordReset';
import ResetNewPassword from './ResetNewPassword';
import ForgotPasswordFinalStep from './FinalStep';
import { ProgressBar } from '../../../components/ProgressBar';
import { forgotPasswordSidebar } from '../../../assets/images';
import { loginSidebar } from '../../../assets/images';
import './style.scss';
const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(1);
  const showComponent = () => {
    switch (activeStep) {
      case 0:
        return <PasswordRecovery setActiveStep={setActiveStep} />;
      case 1:
        return <VerifyPasswordReset setActiveStep={setActiveStep} />;
      case 2:
        return <ResetNewPassword setActiveStep={setActiveStep} />;
      case 3:
        return <ForgotPasswordFinalStep />;
      default:
    }
  };
  const showTitle = () => {
    switch (activeStep) {
      case 0:
        return 'Password recovery';
      case 1:
        return 'Enter verification code';
      case 2:
        return 'Reset new password';
      default:
    }
  };
  return (
    <Page>
      <PageContent className="forgot-password">
        <div>
          <div className="forgot-password-content__container">
            <Logo />
            <div className="progress-bar">
              <ProgressBar totalSteps={4} activeStep={activeStep} />
            </div>
            <h1 className="forgot-password-heading">{showTitle()}</h1>
            <div className="forgot-password-form__container">
              {showComponent()}
            </div>
          </div>
          <img src={forgotPasswordSidebar} alt="sidebar" />
        </div>
      </PageContent>
    </Page>
  );
};

export default ForgotPassword;
