import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForgotPasswordActions, {
  ForgotPasswordSelectors
} from '../../../../redux/ForgotPasswordRedux';
import { Otp } from '../../../../components/Otp';
import Button from '../../../../components/common/Button';
import FlashMessage from '../../../../components/common/FlashMessage';
import './style.scss';
class VerifyPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: [],
      error: '',
      actualOTP: ''
    };
  }

  componentDidMount() {
    // TODO: Add flash message
    /* this.setState({
      successMessage: 'An otp has been sent to your email'
    }); */
  }

  generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  updateOtp = otp => {
    this.setState({ otp });
  };

  handleSubmit = e => {
    if (this.state.otp.length !== 5) {
      this.setState({ error: 'Invalid OTP' });
    } else {
      this.props.verifyForgotPasswordOtpRequest(this.state.otp.join(''));
      //if (this.props.isOtpVerified) this.props.sendResetPasswordLinkRequest();
      this.setState({ error: '' });
    }
  };
  render() {
    return (
      <div className="verify-registration__container">
        <p className="sub-heading">
          Please enter the 5 figure verification code we've sent to the email
          address or mobile number provided
        </p>
        <Otp
          numberOfInputs={5}
          otp={this.state.otp}
          updateOtp={otp => this.updateOtp(otp)}
          error={this.state.error}
        />
        <p className="link" onClick={this.props.sendOtpRequestFP}>
          Resend code
        </p>
        <div className="buttons__container">
          <Button
            variant="outlined"
            size="large"
            onClick={() => this.props.setActiveStep(0)}
          >
            Back
          </Button>
          <Button color="primary" size="large" onClick={this.handleSubmit}>
            Next
          </Button>
        </div>
        {(this.props.successMessage || this.props.errorMessage) && (
          <FlashMessage
            message={this.props.successMessage || this.props.errorMessage}
            hideFlashMessage={this.props.clearMessages}
            variant={
              this.props.errorMessage.length === 0 ? 'success' : 'warning'
            }
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  successMessage: ForgotPasswordSelectors.selectSuccessMessage(state),
  errorMessage: ForgotPasswordSelectors.selectErrorMessage(state),
  isOtpVerified: ForgotPasswordSelectors.selectIsOtpVerified(state)
});
const mapDispatchToProps = dispatch => ({
  sendOtpRequestFP: () => dispatch(ForgotPasswordActions.sendOtpRequestFP()),
  verifyForgotPasswordOtpRequest: otp =>
    dispatch(ForgotPasswordActions.verifyForgotPasswordOtpRequest(otp)),
  clearMessages: () => dispatch(ForgotPasswordActions.clearMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPasswordReset);
