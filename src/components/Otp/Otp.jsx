import React, { Component } from 'react';
import TextInput from '../common/form/TextInput';
import './Otp.scss';
class Otp extends Component {
  constructor(props) {
    super(props);
    this.otpRef1 = React.createRef();
    this.otpRef2 = React.createRef();
    this.otpRef3 = React.createRef();
    this.otpRef4 = React.createRef();
    this.otpRef5 = React.createRef();
  }

  componentDidMount() {
    this.otpRef1.current.focus();
  }

  focusPrevious = (e, index) => {
    const { key } = e.nativeEvent;
    if (key === 'Backspace' && index !== 0) {
      this.otpTextInput[index - 1].current.focus();
    }
  };

  focusNext = (index, e) => {
    if (index < 4 && e.target.value) this[`otpRef${index + 2}`].current.focus();

    if (index === 4) this[`otpRef${index + 1}`].current.blur();

    const { otp } = this.props;
    if (e.target.value !== otp[index]) {
      otp[index] = Number(e.target.value.substring(e.target.value.length - 1));
      /* this.setState({ otp }); */
      this.props.updateOtp(otp);
    }
  };

  renderInputs = numberOfInputs => {
    const inputs = Array(numberOfInputs).fill(0);
    const otpInputs = inputs.map((value, index) => (
      <TextInput
        type="number"
        variant="outlined"
        name={`otp-${index}`}
        key={`otp-${index}`}
        inputProps={{ maxLength: '1', pattern: '[0-9]' }}
        onChange={e => this.focusNext(index, e)}
        onKeyPress={e => this.focusPrevious(e, index)}
        inputRef={this[`otpRef${index + 1}`]}
        value={this.props.otp[index]}
        className={this.props.error.length !== 0 ? 'invalid-field' : ''}
      />
    ));
    return otpInputs;
  };
  render() {
    return (
      <div className="otp">{this.renderInputs(this.props.numberOfInputs)}</div>
    );
  }
}

export default Otp;
