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
        <Logo />
        <div className="progress-bar">
          <ProgressBar />
        </div>
        <h1>Account Details</h1>
        <div className="register-form__container">
          <AccountDetails />
          {/* <Tooltip>Hey</Tooltip> */}
        </div>
        <div className="why-sign-up__container">
          <WhySignUp />
        </div>
      </PageContent>
    </Page>
  );
};

export default register;
