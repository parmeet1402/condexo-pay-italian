import React, { useState, useEffect } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';

import { connect } from 'react-redux';
import { ForgotPasswordSelectors } from '../../../redux/ForgotPasswordRedux';
import UIActions from '../../../redux/UIRedux';
import PasswordRecovery from './PasswordRecovery';
import VerifyPasswordReset from './VerifyPasswordReset';
import ResetNewPassword from './ResetNewPassword';
import ForgotPasswordFinalStep from './FinalStep';
import { ProgressBar } from '../../../components/ProgressBar';
import { forgotPasswordSidebar } from '../../../assets/images';
import { Loader } from '../../../components/Loader';
import './style.scss';
const ForgotPassword = (props) => {
  const [activeStep, setActiveStep] = useState(
    props.match.params.forgotPwdToken ? 2 : 0
  );
  useEffect(() => {
    props.hideNavbar();
  }, []);
  const showComponent = () => {
    switch (activeStep) {
      case 0:
        return <PasswordRecovery setActiveStep={setActiveStep} />;
      case 1:
        return <VerifyPasswordReset setActiveStep={setActiveStep} />;
      case 2:
        return (
          <ResetNewPassword match={props.match} setActiveStep={setActiveStep} />
        );
      case 3:
        return <ForgotPasswordFinalStep />;
      default:
    }
  };
  const showTitle = () => {
    switch (activeStep) {
      case 0:
        return 'Recupera password';
      case 1:
        return 'Inserisci il codice';
      case 2:
        return 'Nuova password';
      case 3:
      default:
    }
  };

  return (
    <Page>
      <PageContent className="forgot-password">
        <div>
          <div className="forgot-password-content__container">
            <Logo isDark />
            {props.isLoading && <Loader />}
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

const mapStateToProps = (state) => ({
  isLoading: ForgotPasswordSelectors.selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideNavbar: () => dispatch(UIActions.hideNavbar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
