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
    setFieldTouched,
    setSubmitting,
    setErrors,
    validateForm,
    isValid
  } = props;

  const [stripeError, setStripeError] = useState({});
  const [isFormValid, setValid] = useState(false);
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const stripeChange = e => {
    console.log('<===========STRIPE CHANGE==========>');
    console.log(e);
    if (e.error && Object.keys(e.error).length !== 0) {
      setStripeError({ ...stripeError, [e.elementType]: e.error.message });
      switch (e.error.code) {
        case 'incomplete_number':
          setStripeError({
            ...stripeError,
            [e.elementType]: 'Please enter card details.'
          });
          break;
        case 'incomplete_expiry':
          setStripeError({
            ...stripeError,
            [e.elementType]: 'Please enter an expiry date.'
          });
          break;
        case 'incomplete_cvc':
          setStripeError({
            ...stripeError,
            [e.elementType]: 'Please enter CVV details.'
          });
          break;
        default:
      }
    } else {
      const removeKey = (key, { [key]: _, ...rest }) => rest;
      const newStripeError = removeKey(e.elementType, stripeError);
      setStripeError(newStripeError);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setValid(true);
    if (Object.keys(stripeError).length !== 0) {
      setValid(false);
      console.log('<-STRIPE ERROR->');
    } else {
      // Check for validating name
      validateForm();
      if (!isValid) {
        console.log('<-INVALID NAME->');
        setValid(false);
      } else {
        // make stripe api call
        let response = await props.stripe.createToken();
        console.log('<-API HIT->');
        console.log(response);
      }
      //
      // todo: Save token
      /* let response = await fetch("/charge", {
         method: "POST",
         headers: {"Content-Type": "text/plain"},
         body: token.id
       }); */

      /*  if (response.ok) console.log("Purchase Complete!") */
    }
  };
  console.table(props);

  return (
    <form
      noValidate
      autoComplete="off"
      className="payment-form"
      onSubmit={handleSubmit}
    >
      <TextInput
        name="name"
        helperText={errors.name}
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
        error={stripeError.cardNumber}
        helperText={stripeError.cardNumber ? stripeError.cardNumber : ''}
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
          error={stripeError.cardExpiry}
          helperText={stripeError.cardExpiry ? stripeError.cardExpiry : ''}
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

          error={stripeError.cardCvc}
          helperText={stripeError.cardCvc ? stripeError.cardCvc : ''}
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
        <Button
          type="submit"
          color="primary"
          size="large"
          /* disabled={!isFormValid} */
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default injectStripe(PaymentDetailsForm);
