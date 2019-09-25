import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import './style.scss';

const TextInput = props => {
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
    <TextField
      name={name}
      required={!!required}
      helperText={helperText}
      error={error}
      value={value}
      label={label}
      onChange={onChange}
      {...restProps}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};
export default TextInput;
