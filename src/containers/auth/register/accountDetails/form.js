import React, { useState } from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { Tooltip } from '../../../../components/common/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const AccountDetailsForm = props => {
  const {
    values: { name, username, password, confirmPassword },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    setSubmitting,
    setErrors,
    validateForm
  } = props;
  /* =========== State =========== */
  const [showPassword, setShowPassword] = useState(false);
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  /*   handleSubmit = async (values, actions) => {
    const { onSubmit } = this.props;
    const { setSubmitting, setErrors } = actions;
    setSubmitting(true);

    try {
      const result = await API.loginWithEmail(values);
      setSubmitting(false);
      onSubmit(result);
    } catch (err) {
      const errors = {
        password: 'Password is wrong'
      };
      setErrors(errors);
    }
    setSubmitting(false);
  }; */
  return (
    <form
      noValidate
      autoComplete="off"
      className="register-form"
      onSubmit={props.handleSubmit}
    >
      <TextInput
        name="name"
        helperText={touched.name ? errors.name : ''}
        error={Boolean(errors.name)}
        label="Name"
        value={name}
        onChange={change.bind(null, 'name')}
        fullWidth
      />
      <TextInput
        name="username"
        helperText={touched.username ? errors.username : ''}
        error={Boolean(errors.username)}
        label="Email address or mobile number"
        value={username}
        onChange={change.bind(null, 'username')}
        fullWidth
      />
      <TextInput
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="password"
        helperText={touched.password ? errors.password : ''}
        error={Boolean(errors.password)}
        label="Password"
        value={password}
        onChange={change.bind(null, 'password')}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment className="start-adornment" position="start">
              <HelpIcon className="help-icon" style={{ cursor: 'pointer' }} />
              <Tooltip>
                Please use a mix of numbers and letters. Must include at least
                one capital letter
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ cursor: 'pointer', color: '#666666' }}
            >
              {showPassword ? (
                <VisibilityOff onClick={() => setShowPassword(false)} />
              ) : (
                <Visibility onClick={() => setShowPassword(true)} />
              )}
            </InputAdornment>
          )
        }}
      />
      <TextInput
        name="confirmPassword"
        type="password"
        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
        error={Boolean(errors.confirmPassword)}
        label="Confirm Password"
        value={confirmPassword}
        onChange={change.bind(null, 'confirmPassword')}
        fullWidth
      />

      <Button
        type="submit"
        color="primary"
        size="large" /* disabled={!isValid} */
      >
        Next
      </Button>
    </form>
  );
};

export default AccountDetailsForm;
