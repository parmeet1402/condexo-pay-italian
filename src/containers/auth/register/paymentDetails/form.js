import React, { useState } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import TextInput from '../../../../components/common/form/TextInput';

import Button from '../../../../components/common/Button';
const PaymentDetailsForm = props => {
  const {
    values: { name },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    setSubmitting,
    setErrors,
    validateForm
    /* handleSubmit */
  } = props;

  const [stripeError, setStripeError] = useState({});

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const stripeChange = e => {
    console.log('<===========STRIPE CHANGE==========>');
    console.log(e);
    if (e.error) {
      setStripeError({ ...stripeError, [e.elementType]: true });
      console.log(stripeError);
    } else {
      const newErrorState = Object.keys(stripeError).reduce((object, key) => {
        if (key !== e.elementType) object[key] = stripeError[key];
        return object;
      }, {});
      console.log(newErrorState);
    }
    /* setError(newErrorState); */
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let response = await props.stripe.createToken();
    console.log(response);
    /* let response = await fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  }); */

    /*  if (response.ok) console.log("Purchase Complete!") */
  };
  const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#c23d4b'
        }
      }
    };
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className="payment-form"
      onSubmit={handleSubmit}
    >
      <TextInput
        name="name"
        helperText={touched.name ? errors.name : ''}
        error={Boolean(errors.name)}
        label="Name on card"
        value={name}
        onChange={change.bind(null, 'name')}
        fullWidth
      />
      <TextInput
        name="cardNumber"
        fullWidth
        label="Card Number"
        /* error={error.card}
      helperText={hasError ? errorMessage || "Invalid" : ""} */
        /* onChange={handleElementChange} */
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          inputProps: {
            component: CardNumberElement,
            onChange: stripeChange
          },
          inputComponent: CardNumberElement
        }}
      />
      <div className="payment-form-cvc-expiry__container">
        <TextInput
          label="Expiry Date"
          name="expiryDate"
          className="expiry-date"
          InputLabelProps={{
            shrink: true
          }}
          /* fullWidth */
          InputProps={{
            inputProps: {
              component: CardExpiryElement,
              onChange: stripeChange
            },
            inputComponent: CardExpiryElement
          }}
        />
        <TextInput
          /* fullWidth */
          name="cvc"
          className="cvc"
          /* error={hasError} */
          /* helperText={hasError ? errorMessage || "Invalid" : ""} */
          /* onChange={handleElementChange} */
          /* InputLabelProps={{
          shrink: true
        }} */

          InputProps={{
            inputProps: {
              component: CardCvcElement,
              onChange: stripeChange
            },
            inputComponent: CardCvcElement
          }}
        />
      </div>
      <div className="buttons__container">
        <Button variant="outlined" size="large">
          Back
        </Button>
        <Button type="submit" color="primary" size="large">
          Button
        </Button>
      </div>
    </form>
  );
};

export default injectStripe(PaymentDetailsForm);
