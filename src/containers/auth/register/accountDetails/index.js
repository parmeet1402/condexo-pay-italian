import React from 'react';
import AccountDetailsForm from './form';
import { Formik } from 'formik';
import validationSchema from './schema';

import './style.scss';

const AccountDetails = props => {
  const values = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  };
  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      // TODO: Add API Call
      setSubmitting(false);
    } catch (err) {
      console.log('Failed');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      render={props => <AccountDetailsForm {...props} />}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  );
};

export default AccountDetails;
