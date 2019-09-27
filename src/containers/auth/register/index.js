import React from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import AccountDetails from './accountDetails';
import PaymentDetails from './paymentDetails';
import { ProgressBar } from '../../../components/ProgressBar';
import { WhySignUp } from '../../../components/WhySignUp';
import './style.scss';
import UploadDocuments from './uploadDocuments';
const register = () => {
  return (
    <Page>
      <PageContent className="register">
        <div>
          <div className="register-content__container">
            <Logo />
            <div className="progress-bar">
              <ProgressBar activeStep={2} />
            </div>
            <h1 className="register-heading">Account Details</h1>
            <div className="register-form__container">
              {/* <AccountDetails /> */}
              {/*  <PaymentDetails/> */}
              <UploadDocuments />
            </div>
          </div>
          <WhySignUp />
        </div>
      </PageContent>
    </Page>
  );
};

export default register;
