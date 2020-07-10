import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import TextInput from '../../../../components/common/form/TextInput';

const MyInputComponent = (props) => {
  const { component: Component, inputRef, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },

    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
};

const AddCardFormView = (props) => {
  // console.log(props);
  const {
    values: { name },
    errors,
    handleChange,
    setFieldTouched,
    validateForm,
    isValid,
  } = props;
  const [stripeError, setStripeError] = useState({});
  const [formData, setFormData] = useState({
    stripeToken: null,
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

  const stripeChange = (e) => {
    console.log(e);
    if (e.error && Object.keys(e.error).length !== 0) {
      setStripeError({ ...stripeError, [e.elementType]: e.error.message });
      switch (e.error.code) {
        case 'incomplete_number':
          setStripeError({
            ...stripeError,
            [e.elementType]: 'Inserire il dati della carta',
          });
          break;
        case 'incomplete_expiry':
          setStripeError({
            ...stripeError,
            [e.elementType]: 'Inserire la data di scadenza della carta',
          });
          break;
        case 'incomplete_cvc':
          setStripeError({
            ...stripeError,
            [e.elementType]: 'Inserire i dati CVC',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.submitForm().then(() => {
      validateForm().then(async () => {
        if (Object.keys(stripeError).length === 0) {
          // make stripe api call
          /* if (isValid) { */
          let response = await props.stripe.createToken({ name });
          console.log(response);
          if (!!response.token) {
            const dateString = `${response.token.card.exp_month}/${response.token.card.exp_year}`;
            const formData = {
              stripeToken: response.token.id,
              nameOnCard: name,
              expiryDate: dateString,
              cardNumber: response.token.card.last4,
              cardType: response.token.card.brand,
              cardId: response.token.card.id,
            };

            if (isValid) setFormData(formData);
            //setActiveStep(2);
          } else {
            const { error } = response;
            switch (error.type) {
              case 'incomplete_number':
                setStripeError({
                  ...stripeError,
                  cardNumber: 'Inserire il dati della carta',
                });
                break;
              case 'incomplete_expiry':
                setStripeError({
                  ...stripeError,
                  cardExpiry: 'Inserire la data di scadenza della carta',
                });
                break;
              case 'incomplete_cvc':
                setStripeError({
                  ...stripeError,
                  cardCvc: 'Inserire i dati CVC',
                });
                break;
              default:
            }
          }
          // todo: Save token
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
          label="Nome sulla carta"
          value={name}
          onChange={change.bind(null, 'name')}
          fullWidth
        />

        <TextInput
          name="cardNumber"
          fullWidth
          label="Numero di carta"
          error={Boolean(stripeError.cardNumber)}
          helperText={stripeError.cardNumber ? stripeError.cardNumber : ''}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              component: CardNumberElement,
              onChange: stripeChange,
            },
            inputComponent: MyInputComponent,
          }}
        />
        <div className="payment-form-cvc-expiry__container">
          <TextInput
            label="Data di scadenza"
            name="expiryDate"
            className="expiry-date"
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(stripeError.cardExpiry)}
            helperText={stripeError.cardExpiry ? stripeError.cardExpiry : ''}
            InputProps={{
              inputProps: {
                component: CardExpiryElement,
                onChange: stripeChange,
              },
              inputComponent: MyInputComponent,
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
                onChange: stripeChange,
              },
              inputComponent: MyInputComponent,
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
  isLoading: PropTypes.bool,
};

export const AddCardForm = injectStripe(AddCardFormView);
