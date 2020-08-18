import React from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { withStyles } from '@material-ui/core/styles';

const ForgotPasswordForm = (props) => {
  const {
    values: { email },
    errors,
    errorMessage,
    handleChange,
    setFieldTouched,
  } = props;

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
        name="email"
        helperText={!!errorMessage ? errorMessage : errors.email}
        error={!!errorMessage || !!errors.email}
        label="Email"
        value={email}
        onChange={change.bind(null, 'email')}
        fullWidth
      />
      {/* <Button
        type="submit"
        color="primary"
        size="large" 
      >
        Avanti
      </Button> */}
      <LightBlueButton
        type="submit"
        color="primary"
        size="large" /* disabled={!isValid} */
      >
        Avanti
      </LightBlueButton>
      <a
        href="mailto:assistenza@condexo.it"
        style={{ textDecoration: 'none', color: '#000' }}
      >
        <p style={{ fontSize: '10px', marginTop: '50px' }}>
          Non ricordi il tuo indirizzo email o non hai accesso al tuo telefono?
          Contatta il servizio clienti
        </p>
      </a>
    </form>
  );
};

export default ForgotPasswordForm;
