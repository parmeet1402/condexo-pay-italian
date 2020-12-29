import React, { useState } from 'react';

//Components
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
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

//Utils
import validationSchema from './schema';
import { mergeAmount } from '../../../../utils/currency';

// Assets
import images from '../../../../assets/icons';

//Stylesheet
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
    mavCode,
    ravCode,
    amountToLeftOfDecimal,
    amountToRightOfDecimal,
    mode,
  },
  handleChange,
  activeVariant,
}) => {
  const [errors, setErrors] = useState({});

  const handleFocus = (e) => {
    /* if(e.target.name === "mavCode" || e.target.name === "ravCode"){

    } */
    /*  if (e.target.name === 'mavCode') {
      handleChange('stepOne', 'ravCode', '');
      handleChange('stepOne', 'mode', 'mav');
    } else if (e.target.name === 'ravCode') {
      handleChange('stepOne', 'mavCode', '');
      handleChange('stepOne', 'mode', 'rav');
    } */
  };

  const handleFormSubmission = (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);

    goStepAhead();
    setSubmitting(false);
  };
  /* const change = (e) => {
    e.persist();
    setFieldTouched(e.target.name, true, false);
    handleChange(e);
  }; */

  const handleInputChange = (e) => {
    e.persist();
    // handleFormikChange(e);
    const {
      target: { name: key, value },
    } = e;
    // setFieldTouched(key, true, false);
    handleChange('stepOne', key, value);

    /* if (key === 'mavCode' || key === 'ravCode') {
      handleChange('stepOne', 'mode', value);
    } */

    // switch between modes

    if (key === 'mavCode' && value) {
      handleChange('stepOne', 'mode', 'mav');
    } else if (key === 'ravCode' && value) {
      handleChange('stepOne', 'mode', 'rav');
    } else if (key === 'mavCode' || key === 'ravCode') {
      handleChange('stepOne', 'mode', '');
    }
  };

  const validateForm = (values) => {
    let hasErrors = false,
      errorsObj = {};

    // mav check
    if (!values.mode || values.mode === 'mav') {
      if (!values.mavCode) {
        hasErrors = true;
        errorsObj['mavCode'] = 'Campo obbligatorio';
      } else if (values.mavCode.length !== 17) {
        hasErrors = true;
        errorsObj['mavCode'] = 'Deve contenere 17 caratteri';
      }
    } else if (values.mode === 'rav') {
      // rav check
      if (!values.ravCode) {
        hasErrors = true;
        errorsObj['ravCode'] = 'Campo obbligatorio';
      } else if (values.ravCode.length !== 17) {
        hasErrors = true;
        errorsObj['ravCode'] = 'Deve contenere 17 caratteri';
      }
    }

    // amount check
    if (!(values.amountToRightOfDecimal || values.amountToLeftOfDecimal)) {
      hasErrors = true;
      errorsObj['amountToLeftOfDecimal'] = 'Campo obbligatorio';
    }
    console.log({ hasErrors, errorsObj });
    return { hasErrors, errorsObj };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMIT CALLED UP');

    // Validate
    const { hasErrors, errorsObj } = validateForm({
      amountToLeftOfDecimal,
      amountToRightOfDecimal,
      mode,
      mavCode,
      ravCode,
    });

    if (hasErrors) {
      setErrors(errorsObj);
    } else {
      setErrors({});
      goStepAhead();
    }
  };
  return (
    <Card className="mav-rav-and-rata-page__step-one">
      <form autoComplete="off" onSubmit={handleSubmit} noValidate>
        <div className="mav-rav-and-rata-page__step-one__icon">
          <img
            src={activeVariant === 'mav-rav' ? images.mavRav : images.rate}
            alt={activeVariant === 'mav-rav' ? 'MAV/RAV' : 'Rata'}
          />
        </div>
        <div className="mav-rav-and-rata-page__step-one__row">
          <TextInput
            inputProps={{ maxLength: 17 }}
            helperText={errors.mavCode || ''}
            error={!!errors.mavCode}
            label="Codice MAV"
            name="mavCode"
            value={mavCode}
            onChange={handleInputChange}
            fullWidth
            disabled={mode === 'rav'}
            onFocus={handleFocus}
            // ref={mavInput}
          />
          <TextInput
            inputProps={{ maxLength: 17 }}
            helperText={errors.ravCode || ''}
            error={!!errors.ravCode}
            label="Codice RAV"
            name="ravCode"
            value={ravCode}
            onChange={handleInputChange}
            fullWidth
            disabled={mode === 'mav'}
            onFocus={handleFocus}
            // ref={ravInput}
          />
        </div>
        <div className="mav-rav-and-rata-page__step-one__row">
          <CurrencyInput
            amountToLeftOfDecimal={amountToLeftOfDecimal}
            amountToRightOfDecimal={amountToRightOfDecimal}
            handleInputChange={handleInputChange}
            errors={errors.amountToLeftOfDecimal}
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
