import React from 'react';
import PaymentDetailsForm from './form';
import { Formik } from 'formik';
import { Elements, StripeProvider } from 'react-stripe-elements';
import validationSchema from './schema';

import './style.scss';

const PaymentDetails = props => {
  const handleSubmit = async e => {
    /* let {token} = await props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) console.log("Purchase Complete!") */
  };

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
          render={props => <PaymentDetailsForm {...props} />}
          initialValues={values}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={true}
          /* onSubmit={(values, actions) => handleSubmit(values, actions)} */
        />
      </>
    </Elements>
  );
};

export default PaymentDetails;

/*   */
