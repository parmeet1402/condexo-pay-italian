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
    const { otp } = this.props;
    if (Number.isInteger(otp[index])) {
      otp[index] = undefined;
      this.props.updateOtp(otp);
    }
  };

  focusNext = async (index, e) => {
    if (index < 4 && e.target.value) this[`otpRef${index + 2}`].current.focus();

    if (index === 4) this[`otpRef${index + 1}`].current.blur();

    const { otp } = this.props;
    const copyOfOtp = [...otp];
    /* if(otp[index]>=0 && otp[index]<=9){
      otp[index] = undefined;
      this.props.updateOtp(otp);
    } */
    if (
      e.target.value !== copyOfOtp[index] ||
      Number.isInteger(copyOfOtp[index])
    ) {
      const valueFromInput = e.target.value;
      if (valueFromInput > 1)
        if (valueFromInput.substr(0, 1) === 0)
          copyOfOtp[index] = Number(valueFromInput.replace(/^0+/, ''));
        else {
          copyOfOtp[index] = Number(
            e.target.value.substring(e.target.value.length - 1)
          );
        }
      /* this.setState({ otp }); */
      await this.props.updateOtp(copyOfOtp);
    }
  };

  handleKeyUp = async (e, index) => {
    e.persist();
    const copyOfOtp = [...this.props.otp];
    if (
      e.target.value !== copyOfOtp[index] ||
      Number.isInteger(copyOfOtp[index])
    ) {
      const valueFromInput = e.target.value;
      if (valueFromInput > 1)
        if (valueFromInput.substr(0, 1) === 0)
          copyOfOtp[index] = Number(valueFromInput.replace(/^0+/, ''));
        else {
          copyOfOtp[index] = Number(
            e.target.value.substring(e.target.value.length - 1)
          );
        }
      /* this.setState({ otp }); */
      await this.props.updateOtp(copyOfOtp);
    }
    /* const pattern = /^[0-9]{1}$/;
      if (!pattern.test(e.target.value)) {
        // invalid character, prevent input
        e.preventDefault();
      } */
    /* 96 105 48 57 */
    if (e.which >= 48 && e.which <= 58) {
    } else if (e.which >= 96 && e.which <= 105) {
    } else {
      e.preventDefault();
    }
  };

  renderInputs = numberOfInputs => {
    const inputs = Array(numberOfInputs).fill(0);
    const otpInputs = inputs.map((value, index) => (
      <TextInput
        type="text"
        variant="outlined"
        name={`otp-${index}`}
        key={`otp-${index}`}
        inputProps={{ pattern: '^[0-9]{1}$' }}
        onChange={e => this.focusNext(index, e)}
        onKeyPress={e => this.focusPrevious(e, index)}
        onKeyUp={e => this.handleKeyUp(e, index)}
        onKeyDown={e => this.handleKeyUp(e, index)}
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
