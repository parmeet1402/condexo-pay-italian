import React from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import HelpIcon from '@material-ui/icons/Help';
const AccountDetailsForm = props => {
  //TODO: Handle Submit
  // TODO: onChange Handler
  /* const {
    values: { userName, password },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    setSubmitting,
    setErrors
} = props; */
  return (
    <form
      noValidate
      autoComplete="off"
      className="register-form"
      /*  onSubmit={handleSubmit} */
    >
      <TextInput
        name="name"
        /* required */
        /* helperText={touched.userName ? errors.userName : ""}
      error={Boolean(errors.userName)} */
        label="Name"
        /*  value={userName} */
        /*  onChange={change.bind(null, "userName")} */
        fullWidth
      />
      <TextInput
        name="email"
        /* required */
        /* helperText={touched.userName ? errors.userName : ""}
      error={Boolean(errors.userName)} */
        label="Email address or mobile number"
        /*  value={userName} */
        /*  onChange={change.bind(null, "userName")} */
        fullWidth
      />
      <TextInput
        name="password"
        type="password"
        className="password"
        /* required */
        /* helperText={touched.userName ? errors.userName : ""}
      error={Boolean(errors.userName)} */
        label={
          <div className="password-label" style={{ display: 'flex' }}>
            New Password
            <HelpIcon />
          </div>
        }
        /*  value={userName} */
        /*  onChange={change.bind(null, "userName")} */
        fullWidth
      />
      <TextInput
        name="confirmPassword"
        type="password"
        /* required */
        /* helperText={touched.userName ? errors.userName : ""}
      error={Boolean(errors.userName)} */
        label="Confirm Password"
        /*  value={userName} */
        /*  onChange={change.bind(null, "userName")} */
        fullWidth
      />

      <Button type="submit" color="primary" size="large">
        Next
      </Button>

      {/* <Button
        type="submit"
        variant="outlined"
        color="primary"
        disabled={!isValid}
    >
        Accedi
    </Button> */}
    </form>
  );
};

export default AccountDetailsForm;
