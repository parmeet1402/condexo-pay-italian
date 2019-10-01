import React from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import PasswordRecovery from './PasswordRecovery';
import { ProgressBar } from '../../../components/ProgressBar';
import './style.scss';
const forgotPassword = () => {
  return (
    <Page>
      <PageContent className="forgot-password">
        <div>
          <div className="forgot-password-content__container">
            <Logo />
            <div className="progress-bar">
              <ProgressBar totalSteps={4} activeStep={1} />
            </div>
            <h1 className="forgot-password-heading">Password</h1>
            <div className="forgot-password-form__container">
              <PasswordRecovery />
            </div>
          </div>
          {/*  <WhySignUp /> */}
        </div>
      </PageContent>
    </Page>
  );
};

export default forgotPassword;
