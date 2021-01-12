import React, { useState, useEffect } from 'react';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import { withStyles } from '@material-ui/core';
import TextInput from '../../../components/common/form/TextInput';
import Button from '../../../components/common/Button';
import icons from '../../../assets/icons';

const MyInputComponent = (props) => {
  const { component: Component, inputRef, ...other } = props;
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {},
  }));

  return <Component {...other} />;
};

const PinkButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#d93879',
    border: '0',
    borderColor: '#d93879',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#d93879',
      border: '1px solid',
      boxShadow: 'none',
      color: '#d93879',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      border: '1px solid',
      borderColor: '#d93879',
    },
    '&:focus': {},
  },
})(Button);

const GuestAddCard = ({
  handleChange,
  setFieldTouched,
  stripe,
  values: { name },
  submitForm,
  validateForm,
  isValid,
  errors,
  changeCard,
  payRecharge,
  selectedCard,
  goBack,
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

  useEffect(() => {
    if (!!selectedCard) {
      //   add card method
      // TODO: FORM DATA
      console.log('selectedCard');
      payRecharge();
      // addProfileCardRequest(formData);
      // completePayment();
    }
  }, [selectedCard]);

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
            // todo: Save token
            if (response.token && response.token.id) {
              changeCard(response.token.id);
              response.token &&
                console.log('response from the server', response);
            }
          }
          /* } */
        }
      });
    });
  };

  return (
    <form
      noValidate
      autComplete="off"
      className="guest-add-card-form gift-card-form"
      onSubmit={handleSubmit}
    >
      <div className="guest-add-card-form__content">
        <h4 className="guest-add-card-form__heading">Nuova carta di credito</h4>
        <div className="guest-add-card-form__row">
          <div className="guest-add-card-form__item">
            <TextInput
              name="name"
              helperText={errors.name}
              error={Boolean(errors.name)}
              label="Nome del titolare"
              value={name}
              onChange={change.bind(null, 'name')}
              fullWidth
            />
          </div>

          <div className="guest-add-card-form__item">
            <TextInput
              name="cardNumber"
              fullWidth
              label="Numero della carta"
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
        </div>
        <div className="guest-add-card-form__row guest-add-card-form__row__lower">
          <div
            className="guest-add-card-form__item"
            style={{ display: 'flex' }}
          >
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
              style={{ width: '280px' }}
            />
            <TextInput
              style={{ width: '250px', marginTop: '16px', marginLeft: '20px' }}
              name="cvc"
              className="cvc"
              // label="codice di verification"
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
          <div className="guest-add-card-form__item">
            <img src={icons.cvvInfo} alt="cvv" />
          </div>
        </div>
        <div className="guest-add-card-form__footer">
          <Button
            onClick={goBack ? goBack : null}
            style={{
              width: '120px',
              height: '40px',
              marginTop: '52px',
            }}
          >
            Indietro
          </Button>
          <PinkButton
            type="submit"
            style={{
              width: '120px',
              height: '40px',
              marginTop: '52px',
            }}
          >
            Procedi
          </PinkButton>
        </div>
      </div>
    </form>
  );
};

export default injectStripe(GuestAddCard);
