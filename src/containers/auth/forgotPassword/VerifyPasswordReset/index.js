import React, { Component } from 'react';
import { Otp } from '../../../../components/Otp';
import Button from '../../../../components/common/Button';
import FlashMessage from '../../../../components/common/FlashMessage';
import './style.scss';
export default class VerifyPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: [],
      error: '',
      actualOTP: ''
    };
  }

  componentDidMount() {
    this.setState({
      actualOTP: this.generateRandomOTP()
    });
  }

  generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  updateOtp = otp => {
    this.setState({ otp });
  };

  handleSubmit = e => {
    if (
      this.state.otp.length !== 6 ||
      parseInt(this.state.otp.join('')) !== this.state.actualOTP
    ) {
      this.setState({ error: 'Invalid OTP' });
    } else {
      this.setState({ error: '' });
      this.props.setActiveStep(2);
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
          numberOfInputs={6}
          otp={this.state.otp}
          updateOtp={otp => this.updateOtp(otp)}
          error={this.state.error}
        />
        <p className="link">Resend code</p>
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
        {this.state.actualOTP && (
          <FlashMessage
            message={`Your OTP is: ${this.state.actualOTP}`}
            hideFlashMessage={this.hideFlashMessage}
            variant={this.state.error.length === 0 ? 'success' : 'warning'}
          />
        )}
      </div>
    );
  }
}
