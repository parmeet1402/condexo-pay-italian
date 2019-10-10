import React, { useState } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { connect } from 'react-redux';
import RegisterActions from '../../../../redux/RegisterRedux';
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
    isValid,
    setActiveStep
  } = props;
  const [stripeError, setStripeError] = useState({});

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const stripeChange = e => {
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
    props.submitForm().then(() => {
      validateForm().then(async () => {
        if (Object.keys(stripeError).length === 0) {
          // make stripe api call
          /* if (isValid) { */
          let response = await props.stripe.createToken({ name });
          console.log(response);
          if (!!response.token && isValid) {
            const dateString = `${response.token.card.exp_month}/${response.token.card.exp_year}`;
            const formData = {
              stripeToken: response.token.id,
              nameOnCard: name,
              expiryDate: dateString,
              cardNumber: response.token.card.last4
            };
            props.setFormData(formData);
            setActiveStep(2);
          }
          // todo: Save token
          response.token &&
            console.log('response from the server', response.token.id);
          /* } */
        }
      });
    });
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
        error={Boolean(stripeError.cardNumber)}
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
          error={Boolean(stripeError.cardExpiry)}
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
          name="cvc"
          className="cvc"
          error={Boolean(stripeError.cardCvc)}
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
        <Button
          variant="outlined"
          size="large"
          onClick={() => setActiveStep(0)}
        >
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
const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(RegisterActions.setFormData(formData))
});

export default injectStripe(
  connect(
    null,
    mapDispatchToProps
  )(PaymentDetailsForm)
);
