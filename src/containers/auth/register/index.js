import React from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import AccountDetails from './accountDetails';
import { Tooltip } from '../../../components/common/Tooltip';

import './style.scss';

const register = () => {
  return (
    <Page>
      <PageContent className="register">
        <Logo />
        <div className="progress-bar">Progress Bar</div>
        <h1>Account Details</h1>
        <div className="register-form__container">
          <AccountDetails />
          <Tooltip />
        </div>
      </PageContent>
    </Page>
  );
};

export default register;
