import React from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import AccountDetails from './accountDetails';
import PaymentDetails from './paymentDetails';
import UploadDocuments from './uploadDocuments';
import VerifyRegistration from './verifyRegistration';
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
              <ProgressBar activeStep={1} />
            </div>
            <h1 className="register-heading">Enter verification code</h1>
            <div className="register-form__container">
              {/* <AccountDetails /> */}
              {/* <PaymentDetails /> */}
              {/* <UploadDocuments /> */}
              <VerifyRegistration />
            </div>
          </div>
          <WhySignUp />
        </div>
      </PageContent>
    </Page>
  );
};

export default register;
