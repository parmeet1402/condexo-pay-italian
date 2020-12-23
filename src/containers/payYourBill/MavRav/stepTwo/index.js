import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import TextInput from '../../../../components/common/form/TextInput';
// import Button from '../../../../components/common/Button';
import Button from '@material-ui/core/Button';
import images from '../../../../assets/icons';
import { withStyles } from '@material-ui/styles';
import Sidebar from '../../Sidebar.jsx';
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
  data: { name, surname, mobileNo, email, ...data },
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
  const handleNextScreenRequest = (e) => {
    // validate

    // make api call
    // proceed further to payment scren
    goStepAhead();
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

    if (!values.mobileNo) {
      hasErrors = true;
      errorsObj['mobileNo'] = 'Campo obbligatorio';
    }
    if (!values.email) {
      hasErrors = true;
      errorsObj['email'] = 'Campo obbligatorio';
    }

    return { hasErrors, errorsObj };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // goStepAhead();
    // Validate
    const { hasErrors, errorsObj } = validateForm({
      name,
      surname,
      mobileNo,
      email,
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
    <form
      className="mav-rav-and-rata-page__step-two"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* <Formik
        render={(props) => ( */}
      <Card className="mav-rav-and-rata-page__step-two__form">
        <div className="mav-rav-and-rata-page__step-one__icon">
          <img
            src={activeVariant === 'mav-rav' ? images.mavRav : images.rate}
            alt={activeVariant === 'mav-rav' ? 'MAV/RAV' : 'Rata'}
          />
        </div>
        <div className="mav-rav-and-rata-page__step-one__row">
          <TextInput
            type="email"
            helperText={errors.name || ''}
            error={!!errors.name}
            // helperText={!!errorMessage ? errorMessage : errors.email}
            // error={!!errorMessage || !!errors.email}
            label="Name"
            name="name"
            value={name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextInput
            helperText={errors.surname || ''}
            error={!!errors.surname}
            // helperText={!!errorMessage ? errorMessage : errors.email}
            // error={!!errorMessage || !!errors.email}
            label="Cognome o Ragione Socialei"
            name="surname"
            value={surname}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="mav-rav-and-rata-page__step-one__row">
          <TextInput
            helperText={errors.mobileNo || ''}
            error={!!errors.mobileNo}
            // helperText={!!errorMessage ? errorMessage : errors.email}
            // error={!!errorMessage || !!errors.email}
            label="Cellulare"
            name="mobileNo"
            value={mobileNo}
            onChange={handleInputChange}
            fullWidth
          />
          <TextInput
            helperText={errors.email || ''}
            error={!!errors.email}
            // helperText={!!errorMessage ? errorMessage : errors.email}
            // error={!!errorMessage || !!errors.email}
            label="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        {activeVariant === 'rata__mav-rav' && (
          <div className="mav-rav-and-rata-page__rata-container">
            <h4>Contatto amministratore di condominio</h4>
            <p>
              Inserisci la mail del tuo amministratore per comunicare il tuo
              pagamento
            </p>
            <div className="mav-rav-and-rata-page__rata-container__content">
              <TextInput
                label="Email"
                name="secondEmail"
                value={data.secondEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
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
      </Card>
      {/*         )}
      /> */}
      <Sidebar
        activeVariant={activeVariant}
        data={{ amountToRightOfDecimal, amountToLeftOfDecimal, last4Digits }}
      />
    </form>
  );
};

export default StepTwo;
