import React from 'react';
import TextField from '@material-ui/core/TextField';
const OtpInput = props => {
  const {
    name,
    required,
    helperText,
    error,
    value,
    label,
    onChange,
    ...restProps
  } = props;
  return (
    <div>
      <TextField type="number" max="1" {...restProps} />
    </div>
  );
};

export default OtpInput;
