import React from 'react';
import { Formik } from 'formik';
import ForgotPasswordForm from './form';
import validationSchema from './schema';
const PasswordRecovery = props => {
  const values = {
    username: ''
  };

  const handleSubmit = (values, actions) => {
    const { username } = values;
    const { setSubmitting, setErrors } = actions;

    setSubmitting(true);
    if (username === 'test@gmail.com') {
      props.setActiveStep(1);
    } else {
      const errors = {
        username:
          'This email address/mobile number has not been registered with us'
      };
      setErrors(errors);
    }
    setSubmitting(false);
  };
  return (
    <Formik
      render={props => <ForgotPasswordForm {...props} />}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmit}
      /*   onSubmit={(values, actions) => handleSubmit(values, actions)} */
    />
  );
};

export default PasswordRecovery;
