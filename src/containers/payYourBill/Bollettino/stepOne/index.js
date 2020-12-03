import React from 'react';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextInput from '../../../../components/common/form/TextInput';
import { InputAdornment } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip } from '../../../../components/common/Tooltip';
import CurrencyInput from '../../../../components/common/form/CurrencyInput';
import Button from '../../../../components/common/Button';
import { withStyles } from '@material-ui/core/styles';

import images from '../../../../assets/icons';
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
const StepOne = ({ goStepAhead, goStepBack }) => {
  return (
    <Card className="bollettino-page__step-one">
      <Formik
        render={(props) => (
          <form>
            <div className="bollettino-page__step-one__icon">
              <img src={images.bollettini} alt="bollettini" />
            </div>
            {/* <fieldset> */}
            <div className="bollettino-page__step-one__row">
              {/* <input type="text" /> */}
              <FormControl className="bollettino-page__select__container">
                <InputLabel id="demo-simple-select-label">
                  Tipologia di bollettino{' '}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Tipologia di bollettino"
                  //   value={timePeriod}
                  //   onChange={handleSelectChange}
                  fullWidth
                  className="bollettino-page__select__input"
                >
                  <MenuItem value={'123'}>123 - Bianco</MenuItem>
                  <MenuItem value={'451'}>451 - Bianco personalizzato</MenuItem>
                  <MenuItem value={'674'}>
                    674 - Premarcato non fatturatore
                  </MenuItem>
                  <MenuItem value={'896'}>
                    896 - Premarcato fatturatore
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="bollettino-page__step-one__row">
              <CurrencyInput />
              <TextInput
                name="email"
                // helperText={!!errorMessage ? errorMessage : errors.email}
                // error={!!errorMessage || !!errors.email}
                label="Numero C/C"
                // value={email}
                // onChange={change.bind(null, 'email')}
                fullWidth
              />
            </div>
            <div className="bollettino-page__step-one__row">
              <TextInput
                name="email"
                // helperText={!!errorMessage ? errorMessage : errors.email}
                // error={!!errorMessage || !!errors.email}
                label="Codice bollettino"
                // value={email}
                // onChange={change.bind(null, 'email')}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      className="start-adornment"
                      position="start"
                    >
                      <HelpIcon
                        className="help-icon"
                        style={{ cursor: 'pointer' }}
                      />
                      {/* <Tooltip>
                        Please use a mix of numbers and letters. Must include at
                        least one capital letter
                      </Tooltip> */}
                    </InputAdornment>
                  ),
                }}
              />
              <TextInput
                name="causale"
                // helperText={!!errorMessage ? errorMessage : errors.email}
                // error={!!errorMessage || !!errors.email}
                label="Causale"
                // value={email}
                // onChange={change.bind(null, 'email')}
                fullWidth
              />
            </div>

            <div className="bollettino-page__footer">
              <BlueButton onClick={goStepAhead}>Procedi</BlueButton>
            </div>
            {/* </fieldset> */}
          </form>
        )}
      ></Formik>
    </Card>
  );
};

export default StepOne;
