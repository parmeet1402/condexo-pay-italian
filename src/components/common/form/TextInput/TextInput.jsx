import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
      /*  InputLabelProps={
      {shrink: false} */

      /* name==="password" &&{
      endAdornment: (
        <InputAdornment position="end">
          <RemoveRedEye/>
        </InputAdornment>
      )
    } */
      InputProps={
        name === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <RemoveRedEye />
            </InputAdornment>
          )
        }
      }
    />
  );
};

TextField.propTypes = {
  name: PropTypes.string.required,
  required: PropTypes.boolean,
  helperText: PropTypes.string,
  error: PropTypes.boolean,
  label: PropTypes.string,
  onChange: PropTypes.func
};
export default /* withStyles(styles) */ TextInput;
