import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import TextInput from '../../../components/common/form/TextInput';
import { addCardAndPayFailed } from '../../../redux/EpayRedux';

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

const AddCardForm = ({
  values: { name },
  errors,
  handleChange,
  setFieldTouched,
  validateForm,
  isValid,
  goBack,
  stripe,
  submitForm,
  successMessage,
  topUpGiftCardRequest,
  addProfileCardRequest,
}) => {
  const [stripeError, setStripeError] = useState({});
  const [formData, setFormData] = useState({
    stripeToken: null,
  });

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  const { stripeToken, cardId } = formData;

  useEffect(
    (e) => {
      if (!!stripeToken && isValid) {
        //   add card method
        addProfileCardRequest(formData);
        // completePayment();
      }
    },
    [stripeToken]
  );

  useEffect(() => {
    if (successMessage) {
      topUpGiftCardRequest({ paymentSource: cardId });
    }
  }, [successMessage]);

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
    submitForm().then(() => {
      validateForm().then(async () => {
        if (Object.keys(stripeError).length === 0) {
          // make stripe api call
          /* if (isValid) { */
          let response = await stripe.createToken({ name });
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
              // stripeCustomerId: '',
            };
            /*  */
            // props.addProfileCardRequest();
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
        <Button variant="outlined" size="large" onClick={goBack}>
          Indietro
        </Button>
        <Button
          type="submit"
          color="secondary"
          size="large"
          variant="contained"
          //   disabled={props.isLoading}
        >
          Procedi
        </Button>
      </div>
    </form>
  );
};

export default injectStripe(AddCardForm);
