import React from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
const ForgotPasswordForm = props => {
  const {
    values: { email },
    errors,
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
        name="email"
        helperText={!!errorMessage ? errorMessage : errors.email}
        error={!!errorMessage || !!errors.email}
        label="Email"
        value={email}
        onChange={change.bind(null, 'email')}
        fullWidth
      />
      <Button
        type="submit"
        color="primary"
        size="large" /* disabled={!isValid} */
      >
        Avanti
      </Button>
      <p style={{ fontSize: '10px', marginTop: '50px' }}>
        Non ricordi il tuo indirizzo email o non hai accesso al tuo telefono?
        Contatta il servizio clienti (hyperlink)
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
