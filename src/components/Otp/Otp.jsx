import React, { Component } from 'react';
import TextInput from '../common/form/TextInput';

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: []
    };
    this.otpRef1 = React.createRef();
    this.otpRef2 = React.createRef();
    this.otpRef3 = React.createRef();
    this.otpRef4 = React.createRef();
    this.otpRef5 = React.createRef();
    this.otpRef6 = React.createRef();
  }

  componentDidMount() {
    this.otpRef1.current.focus();
  }

  focusPrevious = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index !== 0) {
      this.otpTextInput[index - 1].current.focus();
    }
  };

  focusNext = (index, e) => {
    if (index < 5 && e.target.value) this[`otpRef${index + 2}`].current.focus();

    if (index === 5) this[`otpRef${index + 1}`].current.blur();

    const otp = this.state.otp;
    otp[index] = e.target.value;
    this.setState({ otp });
  };

  renderInputs = numberOfInputs => {
    const inputs = Array(numberOfInputs).fill(0);
    const otpInputs = inputs.map((value, index) => (
      <TextInput
        type="number"
        variant="outlined"
        name={`otp-${index}`}
        key={`otp-${index}`}
        inputProps={{ maxLength: '1' }}
        onChange={e => this.focusNext(index, e)}
        onKeyPress={e => this.focusPrevious(e, index)}
        inputRef={this[`otpRef${index + 1}`]}
        value={this.state.otp[index]}
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
