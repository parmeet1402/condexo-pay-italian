import React, { useState } from 'react';
import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '../../../../components/common/Tooltip';
import FlashMessage from '../../../../components/common/FlashMessage';

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
    resetIsVerified,
  } = props;
  /* =========== State =========== */

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const [showMore, setShowMore] = useState(false);
  const [showStopMessageCount, setStopMessageCount] = useState(0);
  const stopMessageContent =
    'Se torni indietro, devi inserire nuovamente il codice di verifica';

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
                Accetto l’informativa sulla &nbsp;
                <a
                  style={{
                    textDecoration: 'none',
                    color: '#4a90e2',
                  }}
                  href="http://condexopay.api.demos.classicinformatics.com/files/uploads/Privacy_condexo_pay.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy
                </a>
                &nbsp;e i &nbsp;
                <a
                  href="http://condexopay.api.demos.classicinformatics.com/files/uploads/Termini_Condexopay.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: '#4a90e2',
                  }}
                >
                  Termini
                </a>
                &nbsp; e condizioni di Condexo
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
                {showMore ? (
                  <>
                    Autorizzo ai sensi del D. Lgs. 196 del 2013 in materia di
                    protezione dei dati personali, dichiaro di aver preso
                    visione dell'Informativa e autorizzo il trattamento dei miei
                    dati ai fini di informazione commerciale, ricerche di
                    mercato e offerte di prodotti e servizi da parte di Condexo
                    s.r.l.&nbsp;
                    <span
                      style={{ color: '#4a90e2' }}
                      onClick={(e) =>
                        setIsDataProtectionAccepted(
                          !isDataProtectionAccepted
                        ) || setShowMore(false)
                      }
                    >
                      Leggi meno
                    </span>
                  </>
                ) : (
                  <>
                    Autorizzo Ai sensi del D. Lgs. 196 del 2013 in materia di
                    protezione dei dati personali,&nbsp;
                    <span
                      style={{ color: '#4a90e2' }}
                      onClick={(e) =>
                        setIsDataProtectionAccepted(
                          !isDataProtectionAccepted
                        ) || setShowMore(true)
                      }
                    >
                      Leggi di più
                    </span>
                  </>
                )}
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
          onClick={() => {
            if (showStopMessageCount === 0) {
              setStopMessageCount(showStopMessageCount + 1);
            } else {
              resetIsVerified();

              setActiveStep(1);
            }
          }}
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
      {showStopMessageCount === 1 && (
        <FlashMessage
          message={stopMessageContent}
          hideFlashMessage={() => {
            setStopMessageCount(2);
          }}
          variant="danger"
        />
      )}
    </form>
  );
};

export default LocationDetailsForm;
