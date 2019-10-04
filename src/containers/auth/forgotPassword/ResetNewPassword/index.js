import React from 'react';
import { Formik } from 'formik';
import ResetNewPasswordForm from './form';
import validationSchema from './schema';
const PasswordRecovery = props => {
  const values = {
    username: ''
  };

  const { setActiveStep } = props;

  const handleSubmit = (values, actions) => {
    const { username } = values;
    const { setSubmitting, setErrors } = actions;

    setSubmitting(true);

    setActiveStep(3);

    setSubmitting(false);
  };
  return (
    <Formik
      render={props => (
        <ResetNewPasswordForm {...props} setActiveStep={setActiveStep} />
      )}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmit}
    />
  );
};

export default PasswordRecovery;
