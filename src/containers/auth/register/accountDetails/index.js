import React from 'react';
import AccountDetailsForm from './form';
import { Formik } from 'formik';
import './style.scss';
const AccountDetails = props => {
  const values = {
    userName: '',
    password: ''
  };
  return (
    <Formik
      render={props => <AccountDetailsForm {...props} />}
      initialValues={values}
      /* validationSchema={validationSchema} */
    />
  );
};

export default AccountDetails;
