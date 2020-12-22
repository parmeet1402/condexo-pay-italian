import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import TextInput from '../../../../components/common/form/TextInput';
// import Button from '../../../../components/common/Button';
import images from '../../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Sidebar from '../../Sidebar.jsx';
// import Sidebar from '../../../giftCardPurchase/sidebar';
import './style.scss';

const BlueButton = withStyles({
  root: {
    color: '#1a315b',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#1a315b',
    borderRadius: 0,
    fontWeight: 'normal',
    padding: '12px 24px',

    '&:hover': {
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
      boxShadow: 'none',
      color: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
      color: '#fff',
    },
    '&:focus': {},
  },
})(Button);

const StepTwo = ({
  goStepAhead,
  goStepBack,
  data: { name, surname, email, address, city, district, postalCode },
  handleChange,
  activeVariant,
  amount: { amountToLeftOfDecimal, amountToRightOfDecimal, last4Digits } = {},
  reserveBillRequest,
  reserveTransactionId,
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (reserveTransactionId) {
      goStepAhead();
    }
  }, [reserveTransactionId]);

  const handleInputChange = (e) => {
    const {
      target: { name: key, value },
    } = e;
    handleChange('stepTwo', key, value);
  };

  const validateForm = (values) => {
    let hasErrors = false,
      errorsObj = {};
    console.log('VALUES IN VALIDATE OBJECT', JSON.stringify(values));

    if (!values.name) {
      hasErrors = true;
      errorsObj['name'] = 'Campo obbligatorio';
    }
    if (!values.surname) {
      hasErrors = true;
      errorsObj['surname'] = 'Campo obbligatorio';
    }

    if (!values.email) {
      hasErrors = true;
      errorsObj['email'] = 'Campo obbligatorio';
    }

    if (!values.address) {
      hasErrors = true;
      errorsObj['address'] = 'Campo obbligatorio';
    }

    if (!values.city) {
      hasErrors = true;
      errorsObj['city'] = 'Campo obbligatorio';
    }

    if (!values.district) {
      hasErrors = true;
      errorsObj['district'] = 'Campo obbligatorio';
    }

    if (!values.postalCode) {
      hasErrors = true;
      errorsObj['postalCode'] = 'Campo obbligatorio';
    }

    return { hasErrors, errorsObj };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate
    const { hasErrors, errorsObj } = validateForm({
      name,
      surname,
      email,
      address,
      city,
      district,
      postalCode,
    });
    //if errors then setErrors and exit
    if (hasErrors) {
      setErrors(errorsObj);
    } else {
      // else reset errors and proceed
      setErrors({});
      // make the api call and after its response proceed further
      // TODO: MAKE THE REQUIRED API CALL
      reserveBillRequest();
    }
    // goStepAhead();
  };

  return (
    <div className="bollettino-page__step-two">
      <Card className="bollettino-page__step-two__form">
        <form onSubmit={handleSubmit} noValidate>
          <div className="bollettino-page__step-one__icon">
            <img src={images.bollettini} alt="bollettini" />
          </div>
          <h3>Eseguito da:</h3>
          <div className="bollettino-page__step-two__row">
            <TextInput
              // helperText={!!errorMessage ? errorMessage : errors.email}
              // error={!!errorMessage || !!errors.email}
              label="Name"
              name="name"
              helperText={errors.name}
              error={!!errors.name}
              value={name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextInput
              type="email"
              // helperText={!!errorMessage ? errorMessage : errors.email}
              // error={!!errorMessage || !!errors.email}
              label="Cognome o Ragione Socialei"
              name="surname"
              helperText={errors.surname}
              error={!!errors.surname}
              value={surname}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="bollettino-page__step-two__row">
            <TextInput
              // helperText={!!errorMessage ? errorMessage : errors.email}
              // error={!!errorMessage || !!errors.email}
              label="Email"
              name="email"
              helperText={errors.email}
              error={!!errors.email}
              value={email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextInput
              // helperText={!!errorMessage ? errorMessage : errors.email}
              // error={!!errorMessage || !!errors.email}
              label="Indirizzo"
              name="address"
              helperText={errors.address}
              error={!!errors.address}
              value={address}
              onChange={handleInputChange}
              // value={email}
              // onChange={change.bind(null, 'email')}
              fullWidth
            />
          </div>
          <div className="bollettino-page__step-two__row">
            <TextInput
              // helperText={!!errorMessage ? errorMessage : errors.email}
              // error={!!errorMessage || !!errors.email}
              label="Città"
              name="city"
              helperText={errors.city}
              error={!!errors.city}
              value={city}
              onChange={handleInputChange}
              // value={email}
              // onChange={change.bind(null, 'email')}
              className="bollettino-page__step-two__row__city"
              fullWidth
            />
            <div style={{ display: 'flex' }}>
              <TextInput
                // helperText={!!errorMessage ? errorMessage : errors.email}
                // error={!!errorMessage || !!errors.email}
                label="Provincia"
                name="district"
                helperText={errors.district}
                error={!!errors.district}
                value={district}
                onChange={handleInputChange}
                // value={email}
                // onChange={change.bind(null, 'email')}
                // fullWidth
                className="bollettino-page__step-two__row__province"
              />
              <TextInput
                name="postalCode"
                helperText={errors.postalCode}
                error={!!errors.postalCode}
                value={postalCode}
                onChange={handleInputChange}
                // helperText={!!errorMessage ? errorMessage : errors.email}
                // error={!!errorMessage || !!errors.email}
                label="CAP"
                // value={email}
                // onChange={change.bind(null, 'email')}
                className="bollettino-page__step-two__row__postal-code"
                // fullWidth
              />
            </div>
          </div>
          <div
            className="bollettino-page__footer"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              variant="outlined"
              style={{ borderRadius: 0, width: '102px' }}
              onClick={goStepBack}
            >
              Indietro
            </Button>
            <BlueButton type="submit">Procedi</BlueButton>
          </div>
        </form>
      </Card>
      <Sidebar
        activeVariant={activeVariant}
        data={{
          amountToLeftOfDecimal,
          amountToRightOfDecimal,
          last4Digits,
        }}
      />
    </div>
  );
};

export default StepTwo;
