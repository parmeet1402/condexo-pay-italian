import React from 'react';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import images from '../../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
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

const StepTwo = ({ goStepAhead, goStepBack }) => {
  return (
    <div className="bollettino-page__step-two">
      <Formik
        render={(props) => (
          <Card className="bollettino-page__step-two__form">
            <form>
              <div className="bollettino-page__step-one__icon">
                <img src={images.bollettini} alt="bollettini" />
              </div>
              <h3>Eseguito da:</h3>
              <div className="bollettino-page__step-two__row">
                <TextInput
                  name="name"
                  // helperText={!!errorMessage ? errorMessage : errors.email}
                  // error={!!errorMessage || !!errors.email}
                  label="Name"
                  // value={email}
                  // onChange={change.bind(null, 'email')}
                  fullWidth
                />
                <TextInput
                  name="surnameOrCompanyName"
                  // helperText={!!errorMessage ? errorMessage : errors.email}
                  // error={!!errorMessage || !!errors.email}
                  label="Cognome o Ragione Socialei"
                  // value={email}
                  // onChange={change.bind(null, 'email')}
                  fullWidth
                />
              </div>
              <div className="bollettino-page__step-two__row">
                <TextInput
                  name="email"
                  // helperText={!!errorMessage ? errorMessage : errors.email}
                  // error={!!errorMessage || !!errors.email}
                  label="Email"
                  // value={email}
                  // onChange={change.bind(null, 'email')}
                  fullWidth
                />
                <TextInput
                  name="address"
                  // helperText={!!errorMessage ? errorMessage : errors.email}
                  // error={!!errorMessage || !!errors.email}
                  label="Indirizzo"
                  // value={email}
                  // onChange={change.bind(null, 'email')}
                  fullWidth
                />
              </div>
              <div className="bollettino-page__step-two__row">
                <TextInput
                  name="city"
                  // helperText={!!errorMessage ? errorMessage : errors.email}
                  // error={!!errorMessage || !!errors.email}
                  label="Città"
                  // value={email}
                  // onChange={change.bind(null, 'email')}
                  className="bollettino-page__step-two__row__city"
                  fullWidth
                />
                <div style={{ display: 'flex' }}>
                  <TextInput
                    name="province"
                    // helperText={!!errorMessage ? errorMessage : errors.email}
                    // error={!!errorMessage || !!errors.email}
                    label="Provincia"
                    // value={email}
                    // onChange={change.bind(null, 'email')}
                    // fullWidth
                    className="bollettino-page__step-two__row__province"
                  />
                  <TextInput
                    name="postalCode"
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
                <BlueButton onClick={goStepAhead}>Procedi</BlueButton>
              </div>
            </form>
          </Card>
        )}
      />
      <Sidebar />
    </div>
  );
};

export default StepTwo;
