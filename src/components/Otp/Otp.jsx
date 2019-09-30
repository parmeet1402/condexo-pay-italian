import React, { Component } from 'react';
import TextInput from '../common/form/TextInput';

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="">
        {Array.from(Array(this.props.codeSize), (e, i) => (
          <TextInput
            variant="outlined"
            name={`otp-${i}`}
            key={`otp-${i}`}
            data-index={i}
            inputProps={{ maxLength: '1' }}
          />
        ))}
      </div>
    );
  }
}

export default Otp;
