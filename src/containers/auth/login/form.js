import React, { useState } from 'react';
import TextInput from '../../../components/common/form/TextInput';
import HelpIcon from '@material-ui/icons/Help';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Button from '../../../components/common/Button';
import { Tooltip } from '../../../components/common/Tooltip';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthSelectors } from '../../../redux/AuthRedux';
import { withStyles } from '@material-ui/core/styles';

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

const LoginForm = (props) => {
  const {
    values: { username, password },
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
  return (
    <form
      autoComplete="off"
      className="login-form"
      onSubmit={props.handleSubmit}
      noValidate
    >
      <TextInput
        name="username"
        helperText={errors.username}
        error={Boolean(errors.username)}
        label="Email"
        value={username}
        onChange={change.bind(null, 'username')}
        fullWidth
      />
      <TextInput
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="password"
        helperText={
          touched.password || props.error ? errors.password || props.error : ''
        }
        error={Boolean(errors.password) || Boolean(props.error)}
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
          ),
        }}
      />
      <LightBlueButton
        type="submit"
        color="primary"
        size="large"
        fullWidth
        style={{ height: '50px' }}
      >
        Entra
      </LightBlueButton>
      <Link
        style={{
          margin: '15px auto 50px auto',
          textDecoration: 'none',
          color: 'rgba(34, 34, 34, 0.87)',
          borderColor: 'rgba(34, 34, 34, 0.87)',
        }}
        className="link"
        to="/forgot-password"
      >
        Hai dimenticato la password?
      </Link>
      <h2
        style={{
          width: '100%',
          fontWeight: '300',
          color: '#10233e',
          textAlign: 'center',
        }}
      >
        Sei nuovo su Condexo Pay?
      </h2>
      <Link
        to="register"
        style={{ textDecoration: 'none', width: '100%', marginTop: '10px' }}
      >
        <Button size="large" variant="outlined" fullWidth textColor="#222">
          <span style={{ color: '#222' }}>Registrati</span>
        </Button>
      </Link>
    </form>
  );
};
const mapStateToProps = (state) => ({
  error: AuthSelectors.selectError(state),
});
export default connect(mapStateToProps, null)(LoginForm);
