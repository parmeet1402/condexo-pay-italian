import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from 'react-stripe-elements';
import TextInput from '../../../components/common/form/TextInput';

const AddCardFormView = props => {
  // console.log(props);
  const {
    values: { name },
    errors,
    handleChange,
    setFieldTouched,
    validateForm,
    isValid
  } = props;
  const [stripeError, setStripeError] = useState({});
  const [formData, setFormData] = useState({
    stripeToken: null
  });

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const { stripeToken } = formData;

  useEffect(() => {
    if (!!stripeToken && isValid) {
      props.addCardAndPay(formData);
    }
  }, stripeToken);

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
            [e.elementType]: 'Please enter CVC details.'
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
          if (!!response.token) {
            const dateString = `${response.token.card.exp_month}/${response.token.card.exp_year}`;
            const formData = {
              stripeToken: response.token.id,
              nameOnCard: name,
              expiryDate: dateString,
              cardNumber: response.token.card.last4,
              cardType: response.token.card.brand,
              cardId: response.token.card.id
            };

            if (isValid) setFormData(formData);
            //setActiveStep(2);
          }
          // todo: Save token
          response.token && console.log('response from the server', response);
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
      <div className="payment-form-content">
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
          label="Card number"
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
      </div>
      <div className="payment-form-btns">
        <Button variant="outlined" size="large" onClick={props.goBack}>
          Indietro
        </Button>
        <Button
          type="submit"
          color="secondary"
          size="large"
          variant="contained"
          disabled={props.isLoading}
        >
          Procedi
        </Button>
      </div>
    </form>
  );
};

AddCardFormView.propTypes = {
  stripe: PropTypes.object,
  goBack: PropTypes.func,
  addCardAndPay: PropTypes.func,
  isLoading: PropTypes.bool
};

export const AddCardForm = injectStripe(AddCardFormView);
