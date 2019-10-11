import React, { Component } from 'react';
import { Otp } from '../../../../components/Otp';
import Button from '../../../../components/common/Button';
import FlashMessage from '../../../../components/common/FlashMessage';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors
} from '../../../../redux/RegisterRedux';
import './style.scss';
class VerifyRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: [],
      error: '',
      showMessage: false
    };
  }

  componentDidMount() {
    this.props.sendOtpRequest();
  }

  generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  updateOtp = otp => {
    this.setState({ otp });
  };

  handleSubmit = e => {
    console.log('GIVEN OTP', this.state.otp);
    console.log('COMBINED OTP', this.state.otp.join(''));

    // TODO: verify otp api call
    if (this.state.otp.length !== 5) {
      this.setState({ error: 'Invalid OTP' });
    } else {
      this.props.verifyOtpRequest();
      this.setState({ error: '' });
      this.props.setActiveStep(4);
    }
  };
  render() {
    return (
      <div className="verify-registration__container">
        <p className="sub-heading">
          Please enter the 6 figure verification code we've sent to the email
          address or mobile number provided
        </p>
        <Otp
          numberOfInputs={5}
          otp={this.state.otp}
          updateOtp={otp => this.updateOtp(otp)}
          error={this.state.error}
        />
        <p className="link" onClick={this.props.sendOtpRequest}>
          Resend code
        </p>
        <div className="buttons__container">
          <Button
            variant="outlined"
            size="large"
            onClick={() => this.props.setActiveStep(2)}
          >
            Back
          </Button>
          <Button color="primary" size="large" onClick={this.handleSubmit}>
            Next
          </Button>
        </div>
        {!!this.props.message && (
          <FlashMessage
            message={this.props.message}
            hideFlashMessage={this.props.clearOtpMessage}
            variant={this.state.error.length === 0 ? 'success' : 'warning'}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  message: RegisterSelectors.selectOtp(state).message
});
const mapDispatchToProps = dispatch => ({
  sendOtpRequest: () => dispatch(RegisterActions.sendOtpRequest()),
  clearOtpMessage: () => dispatch(RegisterActions.clearOtpMessage())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyRegistration);
