import React from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import AccountDetails from './accountDetails';
import { Tooltip } from '../../../components/common/Tooltip';
import { ProgressBar } from '../../../components/ProgressBar';
import { WhySignUp } from '../../../components/WhySignUp';
import './style.scss';
const register = () => {
  return (
    <Page>
      <PageContent className="register">
        <div>
          <div className="register-content__container">
            <Logo />
            <div className="progress-bar">
              <ProgressBar activeStep={0} />
            </div>
            <h1 className="register-heading">Account Details</h1>
            <div className="register-form__container">
              <AccountDetails />
            </div>
          </div>
          <WhySignUp />
        </div>
      </PageContent>
    </Page>
  );
};

export default register;
