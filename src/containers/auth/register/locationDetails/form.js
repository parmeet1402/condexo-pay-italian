import React from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '../../../../components/common/Tooltip';
const DarkBlueCheckbox = withStyles({
  root: {
    color: '#979797',
    borderRadius: '4',
    '&$checked': {
      color: '#4a90e2',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const LightBlueButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#4a90e2',
    border: '1px solid',
    borderColor: '#4a90e2',
    borderRadius: 4,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#4a90e2',
      boxShadow: 'none',
      color: '#4a90e2',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#4a90e2',
    },
    '&:focus': {},
  },
})(Button);

const LocationDetailsForm = (props) => {
  const {
    values: { address, city, district, postalCode },
    errors,
    touched,
    handleChange,
    setFieldTouched,
    isTermsAccepted,
    setIsTermsAccepted,
    showTermsTooltip,
    setTermsTooltipVisibility,
    isDataProtectionAccepted,
    setIsDataProtectionAccepted,
    showDataProtectionTooltip,
    setDataProtectionTooltipVisibility,
    setActiveStep,
  } = props;
  /* =========== State =========== */

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className="register-form"
      onSubmit={props.handleSubmit}
    >
      <TextInput
        name="address"
        helperText={touched.address ? errors.address : ''}
        error={Boolean(errors.address)}
        label="Indirizzo"
        value={address}
        onChange={change.bind(null, 'address')}
        fullWidth
      />
      <TextInput
        name="city"
        helperText={touched.city ? errors.city : ''}
        error={Boolean(errors.city)}
        label="Città"
        value={city}
        onChange={change.bind(null, 'city')}
        fullWidth
      />
      <TextInput
        name="district"
        helperText={touched.district ? errors.district : ''}
        error={Boolean(errors.district)}
        label="Provincia"
        value={district}
        onChange={change.bind(null, 'district')}
        fullWidth
      />
      <TextInput
        name="postalCode"
        helperText={touched.postalCode ? errors.postalCode : ''}
        error={Boolean(errors.postalCode)}
        label="CAP"
        value={postalCode}
        onChange={change.bind(null, 'postalCode')}
        fullWidth
      />
      <div className="checkbox-and-tooltip__container">
        <div className="checkbox-and-tooltip">
          <FormControlLabel
            control={
              <DarkBlueCheckbox
                checked={isTermsAccepted}
                onChange={() => {
                  setIsTermsAccepted(!isTermsAccepted);
                  if (showTermsTooltip) setTermsTooltipVisibility(false);
                }}
                value="checked"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={
              <span>
                Accetto l’informativa sulla Privacy e i Termini e condizioni di
                Condexo
              </span>
            }
          />
          {showTermsTooltip && (
            <Tooltip>
              Per procedere è necessario accettare le condizioni generali
            </Tooltip>
          )}
        </div>
        <div className="checkbox-and-tooltip">
          <FormControlLabel
            control={
              <DarkBlueCheckbox
                checked={isDataProtectionAccepted}
                onChange={() => {
                  setIsDataProtectionAccepted(!isDataProtectionAccepted);
                  if (showDataProtectionTooltip)
                    setDataProtectionTooltipVisibility(false);
                }}
                value="checked"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={
              <span>
                Autorizzo Ai sensi del D. Lgs. 196 del 2013 in materia di
                protezione dei dati personali, Leggi di più
              </span>
            }
          />
          {showDataProtectionTooltip && (
            <Tooltip>
              Per procedere è necessario accettare le condizioni generali
            </Tooltip>
          )}
        </div>
      </div>
      <div className="buttons__container">
        <Button
          variant="outlined"
          size="large"
          onClick={() => setActiveStep(1)}
        >
          Indetro
        </Button>
        <LightBlueButton
          type="submit"
          color="primary"
          size="large" /* onClick={this.handleSubmit} */
        >
          Avanti
        </LightBlueButton>
      </div>
    </form>
  );
};

export default LocationDetailsForm;
