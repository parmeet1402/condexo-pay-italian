import React, { useState, useEffect } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import TextInput from '../../../components/common/form/TextInput';
import Button from '../../../components/common/Button';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

import icons from '../../../assets/icons';
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
const BlueButton = withStyles({
  root: {
    color: '#1a315b',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#1a315b',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
      boxShadow: 'none',
      color: 'white',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
    },
    '&:focus': {},
  },
})(Button);
const PaymentDetailsForm = (props) => {
  const {
    values: { name },
    errors,
    handleChange,
    setFieldTouched,
    validateForm,
    isValid,
    setActiveStep,
    hideModal,
    addProfileCardRequest,
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
      addProfileCardRequest(formData);
      // props.setFormData(formData);
      // setActiveStep(2);
    }
  }, stripeToken);

  const stripeChange = (e) => {
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
      className="add-card-modal"
      onSubmit={handleSubmit}
    >
      <div className="add-card-modal--header">
        <h2>Aggiungi carta</h2>
        <FontAwesomeIcon
          icon={faTimes}
          size="2x"
          style={{ cursor: 'pointer' }}
          onClick={hideModal}
        />
      </div>
      <div className="add-card-modal--content">
        <div className="add-card-modal--form--row">
          <TextInput
            name="name"
            helperText={errors.name}
            error={Boolean(errors.name)}
            label="Nome sulla carta"
            value={name}
            onChange={change.bind(null, 'name')}
            fullWidth
          />
        </div>
        <div className="add-card-modal--form--row">
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
        </div>
        <div className="add-card-modal--form--row">
          <TextInput
            label="Data di scadenza"
            name="expiryDate"
            className="expiry-date"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: '250px' }}
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
            style={{ width: '250px' }}
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
          <img src={icons.cvvInfo} alt="cvv" />
        </div>
        <div
          style={{
            textAlign: 'right',
            paddingTop: '35px',
            marginRight: '-21px',
            paddingBottom: '35px',
          }}
        >
          <Button
            size="large"
            style={{
              color: '#a4abb5',
              border: '1px solid #a4abb5',
              padding: '12px 34px',
              borderRadius: 0,
            }}
            onClick={() => {
              // setData({});
              hideModal();
            }}
          >
            Annulla
          </Button>
          <BlueButton
            type="submit"
            // color="primary"
            size="large"
            style={{
              padding: '12px 30px',
              borderRadius: 0,
              marginLeft: '20px',
              // color: '#1a315b',
              border: '1px solid #1a315b',
            }}
            /* disabled={!isFormValid} */
          >
            Conferma
          </BlueButton>
        </div>
      </div>
    </form>
  );
};
export default injectStripe(PaymentDetailsForm);
