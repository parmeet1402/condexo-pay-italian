import React from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
const ForgotPasswordForm = props => {
  const {
    values: { username },
    errorMessage,
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
      className="forgot-password-form"
      noValidate
      autoComplete="off"
      onSubmit={props.handleSubmit}
    >
      <TextInput
        name="username"
        helperText={errorMessage}
        error={!!errorMessage}
        label="Email address"
        value={username}
        onChange={change.bind(null, 'username')}
        fullWidth
      />
      <Button
        type="submit"
        color="primary"
        size="large" /* disabled={!isValid} */
      >
        Next
      </Button>
      <p style={{ fontSize: '10px', marginTop: '50px' }}>
        Can't remember your email address or mobile number or don't have access
        to it? Contact customer services (hyperlink)
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
