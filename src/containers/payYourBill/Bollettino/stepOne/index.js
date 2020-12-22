import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { Formik } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextInput from '../../../../components/common/form/TextInput';
import { InputAdornment } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip } from '../../../../components/common/Tooltip';
import CurrencyInput from '../../../../components/common/form/CurrencyInput';
// import Button from '../../../../components/common/Button';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

const StepOne = ({
  goStepAhead,
  data: {
    type,
    amountToLeftOfDecimal,
    amountToRightOfDecimal,
    accountNo,
    code,
    desc,
  },
  handleChange,
  types,
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const {
      target: { name: key, value },
    } = e;
    handleChange('stepOne', key, value);
  };

  const validateForm = (values) => {
    let hasErrors = false,
      errorsObj = {};

    // type check = required,
    if (!values.type) {
      hasErrors = true;
      errorsObj['type'] = 'Campo obbligatorio';
    }

    // amount check= required
    if (!(values.amountToRightOfDecimal || values.amountToLeftOfDecimal)) {
      hasErrors = true;
      errorsObj['amountToLeftOfDecimal'] = 'Campo obbligatorio';
    }

    // account No check = required
    if (!values.accountNo) {
      hasErrors = true;
      errorsObj['accountNo'] = 'Campo obbligatorio';
    }

    if (['896', '674'].some((item) => item === values.type))
      if (!values.code) {
        hasErrors = true;
        errorsObj['code'] = 'Campo obbligatorio';
      }
    if (!values.desc) {
      hasErrors = true;
      errorsObj['desc'] = 'Campo obbligatorio';
    }

    console.log({ hasErrors, errorsObj });
    return { hasErrors, errorsObj };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMIT CALLED UP');

    // Validate
    const { hasErrors, errorsObj } = validateForm({
      type,
      amountToLeftOfDecimal,
      amountToRightOfDecimal,
      accountNo,
      code,
      desc,
    });

    if (hasErrors) {
      setErrors(errorsObj);
    } else {
      setErrors({});
      goStepAhead();
    }
  };

  return (
    <Card className="bollettino-page__step-one">
      <form onSubmit={handleSubmit} noValidate>
        <div className="bollettino-page__step-one__icon">
          <img src={images.bollettini} alt="bollettini" />
        </div>
        <div className="bollettino-page__step-one__row">
          <FormControl
            className="bollettino-page__select__container"
            error={!!errors.type}
            helperText={errors.type}
          >
            <InputLabel id="demo-simple-select-label">
              Tipologia di bollettino{' '}
            </InputLabel>
            <Select
              error={!!errors.type}
              helperText={errors.type}
              labelId="demo-simple-select-label"
              label="Tipologia di bollettino"
              value={type}
              onChange={handleInputChange}
              fullWidth
              name="type"
              className="bollettino-page__select__input"
            >
              {types.map((type) => (
                <MenuItem value={type.value}>{type.label}</MenuItem>
              ))}
            </Select>
            {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
          </FormControl>
        </div>
        <div className="bollettino-page__step-one__row">
          <CurrencyInput
            amountToLeftOfDecimal={amountToLeftOfDecimal}
            amountToRightOfDecimal={amountToRightOfDecimal}
            handleInputChange={handleInputChange}
            errors={errors.amountToLeftOfDecimal}
          />
          <TextInput
            inputProps={{ maxLength: 12 }}
            helperText={errors.accountNo}
            error={!!errors.accountNo}
            label="Numero C/C"
            name="accountNo"
            value={accountNo}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="bollettino-page__step-one__row">
          {(type === '896' || type === '674') && (
            <TextInput
              helperText={errors.code}
              error={!!errors.code}
              // helperText={!!errorMessage ? errorMessage : errors.email}
              // error={!!errorMessage || !!errors.email}
              label="Codice bollettino"
              name="code"
              value={code}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment className="start-adornment" position="start">
                    <HelpIcon className="help-icon" />

                    <Tooltip>
                      Indica il codice numerico di 18 cifre riportato in basso a
                      sinistra nel bollettino
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <TextInput
            inputProps={{ maxLength: 60 }}
            helperText={errors.desc}
            error={!!errors.desc}
            // helperText={!!errorMessage ? errorMessage : errors.email}
            // error={!!errorMessage || !!errors.email}
            label="Causale"
            name="desc"
            value={desc}
            onChange={handleInputChange}
            className={`bollettino-page__description-input ${
              type === '896' || type === '674' ? '' : 'w-40'
            }`}
            // style={type === '896' || type === '674' ? {} : { width: '40%' }}
            // value={email}
            // onChange={change.bind(null, 'email')}
            fullWidth
          />
        </div>

        <div className="bollettino-page__footer">
          <BlueButton type="submit">Procedi</BlueButton>
        </div>
      </form>
    </Card>
  );
};

export default StepOne;
