import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors
} from '../../../../redux/RegisterRedux';
import TextInput from '../../../../components/common/form/TextInput';
import PaymentDetailsForm from './form';
import { Formik } from 'formik';
import { Elements, StripeProvider } from 'react-stripe-elements';
import validationSchema from './schema';
import Button from '../../../../components/common/Button';

import './style.scss';

const PaymentDetails = props => {
  const setActiveStepFromProps = props.setActiveStep;
  const { formData } = props;
  const values = {
    name: formData.nameOnCard || ''
  };

  const renderFilledForm = formData => {
    const { nameOnCard, expiryDate, cardNumber } = formData;
    return (
      <div className="filled-form">
        <TextInput
          name="nameOnCard__filled"
          label="Name on card"
          fullWidth
          value={nameOnCard}
          disabled
        />
        <TextInput
          name="cardNumber__filled"
          label="Card number"
          fullWidth
          value={`XXXX-XXXX-XXXX-${cardNumber}`}
          disabled
        />
        <div className="filled-form-cvc-expiry__container">
          <TextInput
            name="nameOnCard__filled"
            label="Expiry Date"
            className="expiry-date"
            disabled
            value={expiryDate}
          />
          <TextInput
            name="cvc__filled"
            label="CVC"
            className="cvc"
            value="***"
            disabled
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p
            className="link"
            style={{ textAlign: 'center', margin: '0 auto' }}
            onClick={props.deleteCard}
          >
            Delete Card
          </p>
        </div>
        <div className="buttons__container">
          <Button
            variant="outlined"
            size="large"
            onClick={() => props.setActiveStep(0)}
          >
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            size="large"
            onClick={() => props.setActiveStep(2)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Elements>
      <>
        <p className="sub-heading">
          Please enter the card details you wish to use to send and receive
          money on
        </p>
        {!!props.stripeToken ? (
          renderFilledForm(props.formData)
        ) : (
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
        )}
      </>
    </Elements>
  );
};

const mapStateToProps = state => ({
  formData: RegisterSelectors.selectFormData(state),
  stripeToken: RegisterSelectors.selectStripeToken(state)
});

const mapDispatchToProps = dispatch => ({
  deleteCard: () => dispatch(RegisterActions.deleteCard())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetails);
