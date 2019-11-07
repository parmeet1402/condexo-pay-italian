import React, { useState } from 'react';
import ReactSelectMaterialUi from 'react-select-material-ui';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { Tooltip } from '../../../../components/common/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import SelectWithSearch from '../../../../components/common/form/SelectWithSearch';
const AccountDetailsForm = props => {
  const {
    values: {
      name,
      surname,
      email,
      countryCode,
      phoneNumber,
      password,
      confirmPassword
    },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    setFieldValue,
    setSubmitting,
    setErrors,
    validateForm,
    countryCodes
  } = props;

  let options = [];
  if (!!countryCodes && countryCodes.length > 0 && options.length === 0) {
    if (countryCodes.length > 0)
      countryCodes.forEach(country => {
        options.push({
          value: country.code,
          label: `(${country.code})\t${country.countryName}`
        });
      });
  }

  /* =========== State =========== */
  const [showPassword, setShowPassword] = useState(false);
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  const handleSelectChange = value => {
    setFieldValue('countryCode', value);
    setFieldTouched('countryCode', true, false);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className="register-form"
      onSubmit={props.handleSubmit}
    >
      <TextInput
        name="name"
        helperText={touched.name ? errors.name : ''}
        error={Boolean(errors.name)}
        label="Nome"
        value={name}
        onChange={change.bind(null, 'name')}
        fullWidth
      />
      <TextInput
        name="surname"
        helperText={touched.surname ? errors.surname : ''}
        error={Boolean(errors.surname)}
        label="Cognome"
        value={surname}
        onChange={change.bind(null, 'surname')}
        fullWidth
      />
      <TextInput
        name="email"
        helperText={touched.email ? errors.email : ''}
        error={Boolean(errors.email)}
        label="Email"
        value={email}
        onChange={change.bind(null, 'email')}
        fullWidth
      />
      <div className="country-code-and-number">
        <SelectWithSearch
          label="Prefisso"
          selectValue={countryCode}
          error={errors.countryCode}
          data={countryCodes}
          handleSelectChangeProps={handleSelectChange}
        />
        {/* <ReactSelectMaterialUi
          style={{ width: '300px' }}
          value={countryCode}
          placeholder="+39"
          className="country-code"
          onChange={e => handleSelectChange(e)}
          onChange={e => console.log('CHANGE')}
          options={options}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="end"
                style={{ cursor: 'pointer', color: '#666666' }}
              >
                <ArrowDropDownIcon />
              </InputAdornment>
            )
          }}
        /> */}

        <TextInput
          name="phoneNumber"
          className="phone-number"
          helperText={touched.phoneNumber ? errors.phoneNumber : ''}
          error={Boolean(errors.phoneNumber)}
          label="Cellulare"
          value={phoneNumber}
          onChange={change.bind(null, 'phoneNumber')}
        />
      </div>
      <TextInput
        name="password"
        type={showPassword ? 'text' : 'password'}
        className="password"
        helperText={touched.password ? errors.password : ''}
        error={Boolean(errors.password)}
        label="Password"
        value={password}
        onChange={change.bind(null, 'password')}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment className="start-adornment" position="start">
              <HelpIcon className="help-icon" style={{ cursor: 'pointer' }} />
              <Tooltip className="password-tooltip">
                You must use a mix of lower and upper case letters, numbers and
                symbols. 8 characters minimum.
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ cursor: 'pointer', color: '#666666' }}
            >
              {showPassword ? (
                <VisibilityOff onClick={() => setShowPassword(false)} />
              ) : (
                <Visibility onClick={() => setShowPassword(true)} />
              )}
            </InputAdornment>
          )
        }}
      />
      <TextInput
        name="confirmPassword"
        type="password"
        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
        error={Boolean(errors.confirmPassword)}
        label="Ripeti Password"
        value={confirmPassword}
        onChange={change.bind(null, 'confirmPassword')}
        fullWidth
      />
      <Button
        type="submit"
        color="primary"
        size="large" /* disabled={!isValid} */
      >
        Avanti
      </Button>
    </form>
  );
};

export default AccountDetailsForm;
