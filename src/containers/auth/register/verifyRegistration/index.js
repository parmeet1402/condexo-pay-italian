import React, { Component } from 'react';
import { Otp } from '../../../../components/Otp';
import './style.scss';
export default class VerifyRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="verify-registration__component">
        <p className="sub-heading">
          Please enter the 6 figure verification code we've sent to the email
          address or mobile number provided
        </p>
        <Otp codeSize={4} />
      </div>
    );
  }
}
