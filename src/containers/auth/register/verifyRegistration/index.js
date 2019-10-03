import React, { Component } from 'react';
import { Otp } from '../../../../components/Otp';
import Button from '../../../../components/common/Button';
import './style.scss';
export default class VerifyRegistration extends Component {
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
    console.log('GIVEN OTP', this.state.otp);
    console.log('ACTUAL OTP', this.state.actualOTP);
    console.log('COMBINED OTP', this.state.otp.join(''));
    if (
      this.state.otp.length !== 6 ||
      parseInt(this.state.otp.join('')) !== this.state.actualOTP
    ) {
      this.setState({ error: 'Invalid OTP' });
    } else {
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
            onClick={() => this.props.setActiveStep(2)}
          >
            Back
          </Button>
          <Button color="primary" size="large" onClick={this.handleSubmit}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}
