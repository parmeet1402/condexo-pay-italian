import React, { useState } from 'react';
import { Page, PageContent } from '../layout';
import { connect } from 'react-redux';
import { Logo } from '../../components/Logo';
import { ProgressBar } from '../../components/ProgressBar';
import './style.scss';
const FastPayment = () => {
  const [activeStep, setActiveStep] = useState(0);

  const showComponent = () => {
    /* switch (activeStep) {
      case 0:
      default:
        return <></>;
    } */
    return <>CONTENT</>;
  };
  return (
    <Page>
      <PageContent className="fast-payment">
        <div className="register-content__container">
          <Logo />
          <div className="progress-bar">
            <ProgressBar totalSteps={4} activeStep={activeStep} />
          </div>
          <div className="fast-payment--content__container">
            {showComponent()}
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default connect(null, null)(FastPayment);

/*
const Register = () => {
  return (
    <Page>
      <PageContent className="register">
        <div>
          <div className="register-content__container">
            <Logo />
            <div className="progress-bar">
              <ProgressBar totalSteps={4} activeStep={activeStep} />
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
 */
