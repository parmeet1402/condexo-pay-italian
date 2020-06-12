import React from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '../../../../components/common/Tooltip';
const DarkBlueCheckbox = withStyles({
  root: {
    color: '#1a315b',
    '&$checked': {
      color: '#1a315b',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const LocationDetailsForm = (props) => {
  const {
    values: { address, city, district, postalCode },
    errors,
    touched,
    handleChange,
    setFieldTouched,
    isAccepted,
    setIsAccepted,
    showTooltip,
    setTooltipVisibility,
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
      <div className="checkbox-and-tooltip">
        <FormControlLabel
          control={
            <DarkBlueCheckbox
              checked={isAccepted}
              onChange={() => {
                setIsAccepted(!isAccepted);
                if (showTooltip) setTooltipVisibility(false);
              }}
              value="checked"
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Accetto le condizioni e ho letto l’informativa sulla privacy"
        />
        {showTooltip && (
          <Tooltip>
            Per procedere è necessario accettare le condizioni generali
          </Tooltip>
        )}
      </div>
      <div className="buttons__container">
        <Button
          variant="outlined"
          size="large"
          onClick={() => setActiveStep(1)}
        >
          Indetro
        </Button>
        <Button
          type="submit"
          color="primary"
          size="large" /* onClick={this.handleSubmit} */
        >
          Avanti
        </Button>
      </div>
    </form>
  );
};

export default LocationDetailsForm;
