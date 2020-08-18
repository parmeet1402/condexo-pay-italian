import React, { useState } from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { Tooltip } from '../../../../components/common/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const ResetNewPasswordForm = (props) => {
  const {
    values: { password, confirmPassword },
    errors,
    touched,
    handleChange,
    setFieldTouched,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
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

  return (
    <form
      className="forgot-password-form"
      noValidate
      autoComplete="off"
      onSubmit={props.handleSubmit}
    >
      <TextInput
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="password"
        helperText={touched.password ? errors.password : ''}
        error={Boolean(errors.password)}
        label="Nuova password"
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
          ),
        }}
      />
      <TextInput
        name="confirmPassword"
        type="password"
        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
        error={Boolean(errors.confirmPassword)}
        label="Conferma Nuova password"
        value={confirmPassword}
        onChange={change.bind(null, 'confirmPassword')}
        fullWidth
      />
      <div className="buttons__container">
        <Button
          variant="outlined"
          size="large"
          onClick={() => props.setActiveStep(1)}
        >
          Indietro
        </Button>
        <LightBlueButton color="primary" size="large" type="submit">
          Avanti
        </LightBlueButton>
      </div>
    </form>
  );
};

export default ResetNewPasswordForm;
