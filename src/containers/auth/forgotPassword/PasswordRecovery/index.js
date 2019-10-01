import React from 'react';
import { Formik } from 'formik';
import ForgotPasswordForm from './form';
import validationSchema from './schema';
const PasswordRecovery = props => {
  const values = {
    username: ''
  };
  return (
    <Formik
      render={props => <ForgotPasswordForm {...props} />}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      /*   onSubmit={(values, actions) => handleSubmit(values, actions)} */
    />
  );
};

export default PasswordRecovery;
