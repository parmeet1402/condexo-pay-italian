import React, { Component } from 'react';
import { Otp } from '../../../../components/Otp';
import Button from '../../../../components/common/Button';
import FlashMessage from '../../../../components/common/FlashMessage';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors,
} from '../../../../redux/RegisterRedux';
import { Loader } from '../../../../components/Loader';
import { withStyles } from '@material-ui/core/styles';

import './style.scss';

const LightBlueButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#4a90e2',
    border: '1px solid',
    borderColor: '#4a90e2',
    borderRadius: 4,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#4a90e2',
      boxShadow: 'none',
      color: '#4a90e2',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#4a90e2',
    },
    '&:focus': {},
  },
})(Button);
class VerifyRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: [],
      error: '',
      showMessage: false,
    };
  }

  componentDidMount() {
    this.props.sendOtpRequest();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.isVerified &&
      nextProps.message !== 'Incorrect OTP is entered'
    ) {
      nextProps.setActiveStep(2);
    }
  }

  generateRandomOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  updateOtp = (otp) => {
    this.setState({ otp });
  };

  handleSubmit = (e) => {
    if (
      this.state.otp.length !== 5 &&
      this.state.otp.indexOf(undefined) === -1
    ) {
      this.setState({ error: 'Invalid OTP' });
    } else {
      try {
        this.props.verifyOtpRequest(this.state.otp.join(''));
      } catch (error) {
        console.log(error);
      }
      this.setState({ error: '' });
      if (this.props.status === 'success') this.props.setActiveStep(4);
    }
  };
  render() {
    return (
      <div className="verify-registration__container">
        <p className="sub-heading">
          Controlla il telefono e inserisci il codice che ti abbiamo inviato
        </p>
        {(this.props.isLoading ||
          this.props.isCompleting ||
          this.props.isVerifying) && <Loader />}
        <Otp
          numberOfInputs={5}
          otp={this.state.otp}
          updateOtp={(otp) => this.updateOtp(otp)}
          error={this.state.error}
        />
        <p className="link" onClick={this.props.sendOtpRequest}>
          Inviami un nuovo codice
        </p>
        <div className="buttons__container">
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              this.props.clearMessages();
              this.props.setActiveStep(0);
            }}
          >
            Indetro
          </Button>
          <LightBlueButton
            color="primary"
            size="large"
            onClick={this.handleSubmit}
          >
            Avanti
          </LightBlueButton>
        </div>
        {!!this.props.message && (
          <FlashMessage
            message={this.props.message}
            hideFlashMessage={this.props.clearOtpMessage}
            variant={this.props.status}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  message: RegisterSelectors.selectOtp(state).message,
  status: RegisterSelectors.selectOtp(state).status,
  isLoading: RegisterSelectors.selectOtp(state).isLoading,
  isVerifying: RegisterSelectors.selectOtp(state).isVerifying,
  isVerified: RegisterSelectors.selectOtp(state).isVerified,
  isCompleting: RegisterSelectors.selectIsCompleting(state),
  isCompleted: RegisterSelectors.selectIsCompleted(state),
});
const mapDispatchToProps = (dispatch) => ({
  sendOtpRequest: () => dispatch(RegisterActions.sendOtpRequest()),
  verifyOtpRequest: (otp) => dispatch(RegisterActions.verifyOtpRequest(otp)),
  clearOtpMessage: () => dispatch(RegisterActions.clearOtpMessage()),
  completeRegistrationRequest: () =>
    dispatch(RegisterActions.completeRegistrationRequest()),
  clearMessages: () => dispatch(RegisterActions.clearMessages()),
});
export default connect(mapStateToProps, mapDispatchToProps)(VerifyRegistration);
