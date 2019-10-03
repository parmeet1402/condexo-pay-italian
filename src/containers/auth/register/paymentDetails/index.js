import React, { useState } from 'react';
import PaymentDetailsForm from './form';
import { Formik } from 'formik';
import { Elements, StripeProvider } from 'react-stripe-elements';
import validationSchema from './schema';

import './style.scss';

const PaymentDetails = props => {
  const setActiveStepFromProps = props.setActiveStep;

  const values = {
    name: ''
  };
  return (
    <Elements>
      <>
        <p className="sub-heading">
          Please enter the card details you wish to use to send and receive
          money on
        </p>
        <Formik
          render={props => (
            <PaymentDetailsForm
              {...props}
              setActiveStep={setActiveStepFromProps}
            />
          )}
          /* onSubmit={handleSubmit} */
          initialValues={values}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={(values, actions) => {}}
          /* onSubmit={(values, actions) => handleSubmit(values, actions)} */
        />
      </>
    </Elements>
  );
};

export default PaymentDetails;
