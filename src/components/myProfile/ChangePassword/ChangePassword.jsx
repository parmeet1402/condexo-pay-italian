import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../../common/form/TextInput';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Button from '../../common/Button';
import { connect } from 'react-redux';
import MyProfileActions from '../../../redux/MyProfileRedux';
import validationSchema from './schema';
import './ChangePassword.scss';
const ChangePassword = props => {
  // TODO: eye states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const renderForm = props => {
    const {
      values: { oldPassword, newPassword, confirmNewPassword },
      errors,
      handleChange,
      setFieldTouched
    } = props;
    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };
    return (
      <form
        className="change-password--form"
        noValidate
        autoComplete="off"
        onSubmit={props.handleSubmit}
      >
        <div className="change-password--form__row">
          <div className="change-password--form__item">
            <TextInput
              name="oldPassword"
              type={showOldPassword ? 'text' : 'password'}
              label="Vecchia password"
              helperText={errors.oldPassword}
              error={Boolean(errors.oldPassword)}
              value={oldPassword}
              onChange={change.bind(null, 'oldPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: 'pointer', color: '#666666' }}
                  >
                    {showOldPassword ? (
                      <VisibilityOff
                        onClick={() => setShowOldPassword(false)}
                      />
                    ) : (
                      <Visibility onClick={() => setShowOldPassword(true)} />
                    )}
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        <div className="change-password--form__row">
          <div className="change-password--form__item">
            <TextInput
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              label="Nuova password"
              helperText={errors.newPassword}
              error={Boolean(errors.newPassword)}
              value={newPassword}
              onChange={change.bind(null, 'newPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: 'pointer', color: '#666666' }}
                  >
                    {showNewPassword ? (
                      <VisibilityOff
                        onClick={() => setShowNewPassword(false)}
                      />
                    ) : (
                      <Visibility onClick={() => setShowNewPassword(true)} />
                    )}
                  </InputAdornment>
                )
              }}
            />
          </div>
          <div className="change-password--form__item">
            <TextInput
              name="confirmNewPassword"
              type={showConfirmNewPassword ? 'text' : 'password'}
              label="Conferma nuova password"
              helperText={errors.confirmNewPassword}
              error={Boolean(errors.confirmNewPassword)}
              value={confirmNewPassword}
              onChange={change.bind(null, 'confirmNewPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: 'pointer', color: '#666666' }}
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityOff
                        onClick={() => setShowConfirmNewPassword(false)}
                      />
                    ) : (
                      <Visibility
                        onClick={() => setShowConfirmNewPassword(true)}
                      />
                    )}
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
        <Button
          type="submit"
          borderColor="#1a315b"
          variant="outlined"
          style={{ width: '91px' }}
        >
          <span
            style={{ color: '#1a315b', fontWeight: '500', fontSize: '14px' }}
          >
            Salva
          </span>
        </Button>
      </form>
    );
  };
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmNewPassword(false);
      props.changePasswordRequest(values);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="change-password">
      <div className="change-password--header">
        <h2>Cambia password</h2>
      </div>
      <div className="change-password--form__container">
        <Formik
          render={props => renderForm(props)}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  changePasswordRequest: data =>
    dispatch(MyProfileActions.changePasswordRequest(data))
});

export default connect(
  null,
  mapDispatchToProps
)(ChangePassword);
