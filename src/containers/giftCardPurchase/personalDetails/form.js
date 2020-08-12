import React, { useState, useEffect } from 'react';
import TextInput from '../../../components/common/form/TextInput';
import Button from '../../../components/common/Button';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '../../../components/common/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import AmazonTermsModal from '../../../components/modals/AmazonTermsModal';
import { currencyToString, stringToCurrency } from '../../../utils/currency';
const DarkBlueCheckbox = withStyles({
  root: {
    color: '#fff',
    '& .MuiIconButton-label': {
      border: '1px solid #ddd',
    },
    '&$checked': {
      color: '#fff',
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
      },
      '& .MuiIconButton-label:after': {
        content: '""',
        left: 4,
        top: 4,
        height: 15,
        width: 15,
        position: 'absolute',
        backgroundColor: '#09952e',
        zIndex: -1,
      },
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueButton = withStyles({
  root: {
    color: '#1a315b',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#1a315b',
    borderRadius: 0,
    fontWeight: 'normal',

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

const PersonalDetailForm = ({
  values: { amount, email, desc, amazonId },
  errors,
  touched,
  handleChange,
  handleSubmit,
  setFieldTouched,
  setFieldValue,
  supplier,
  activeProduct,
  initialAmount,
  isAccepted,
  setIsAccepted,
  showTooltip,
  setTooltipVisibility,
  setActiveAmount,
}) => {
  const [isAmazonTermsModalVisible, setAmazonTermsModalVisibility] = useState(
    false
  );

  const change = (name, e) => {
    e.persist();
    // console.log('BEFORE TRANSFORMATION: ', e.target.value);
    if (name === 'amount') e.target.value = currencyToString(e.target.value);
    console.log(e);
    // console.log('AFTER TRANSFORMATION', e.target.value);
    handleChange(e);

    setFieldTouched(name, true, false);

    if (name === 'amount') {
      setActiveAmount(e.target.value);
    }
  };
  console.log('INITIAL AMOUNT', initialAmount);
  return (
    <div className="gc-personal-detail-form__container">
      <h2 className="gc-personal-detail-form__heading">
        Inserisci le informazioni mancanti oppure clicca su procedi
      </h2>
      <form
        noValidate
        autoComplete="off"
        className="gc-personal-detail-form"
        onSubmit={handleSubmit}
      >
        <div className="gc-personal-detail-form__row">
          <div className="gc-personal-detail-form__row__item amount">
            {initialAmount == 0 ? (
              <TextInput
                name="amount"
                helperText={touched.amount ? errors.amount : ''}
                error={Boolean(errors.amount)}
                label="Inserisci il valore"
                value={stringToCurrency(amount)}
                onChange={change.bind(null, 'amount')}
                fullWidth
                maxLength="5"
                onKeyPress={(e) => {
                  if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                  }
                  if (e.target.value.length > 7) {
                    e.preventDefault();
                  }
                }}
              />
            ) : (
              <TextInput
                name="amount"
                helperText={touched.amount ? errors.amount : ''}
                error={Boolean(errors.amount)}
                label="Valore gitfcard"
                value={amount ? stringToCurrency(amount) : amount}
                onChange={change.bind(null, 'amount')}
                fullWidth
                maxLength="5"
                disabled
                onKeyPress={(e) => {
                  if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                  }
                }}
              />
            )}
          </div>
          {supplier === 'Amazon' && (
            <div className="gc-personal-detail-form__row__item amazon-id">
              <TextInput
                name="amazonId"
                helperText={touched.amazonId ? errors.amazonId : ''}
                error={Boolean(errors.amazonId)}
                label="Nuemro seriale"
                value={amazonId}
                onChange={change.bind(null, 'amazonId')}
                fullWidth
              />
            </div>
          )}
          <div
            className={`gc-personal-detail-form__row__item email ${
              supplier === 'Amazon' ? 'includes-amazon' : ''
            }`}
          >
            <TextInput
              name="email"
              helperText={touched.email ? errors.email : ''}
              error={Boolean(errors.email)}
              label="Email"
              value={email}
              onChange={change.bind(null, 'email')}
              fullWidth
            />
          </div>
        </div>
        <div className="gc-personal-detail-form__row">
          <TextInput
            name="desc"
            helperText={touched.desc ? errors.desc : ''}
            error={Boolean(errors.desc)}
            label="Inserire testo (opzionale)"
            value={desc}
            onChange={change.bind(null, 'desc')}
            fullWidth
          />
        </div>
        {supplier === 'Amazon' && (
          <span
            style={{
              display: 'flex',
              color: '#1a315b',
              marginTop: '37px',
              cursor: 'pointer',
            }}
            onClick={() => setAmazonTermsModalVisibility(true)}
          >
            <HelpIcon
              className="help-icon"
              style={{
                cursor: 'pointer',
                color: '#1a315b',
                marginRight: '7px',
              }}
            />
            Ricarica il tuo conto
          </span>
        )}
        <div className="gc-personal-detail-form__footer">
          {showTooltip && <Tooltip>Si prega di confermare</Tooltip>}
          <FormControlLabel
            control={
              <DarkBlueCheckbox
                checked={isAccepted}
                onChange={() => {
                  setIsAccepted(!isAccepted);
                  // if (showTooltip) setTooltipVisibility(false);
                }}
                value="checked"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={
              <p>
                Ho letto e accetto i &nbsp;
                <a
                  href="http://condexopay.api.demos.classicinformatics.com/files/uploads/Termini_Condexopay.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: '#4a90e2',
                    borderBottom: '1px solid #4a90e2',
                  }}
                >
                  Termini e Condizioni
                </a>
                &nbsp; di Condexo Pay
              </p>
            }
          />

          <BlueButton
            size="small"
            style={{
              padding: '11px 37px',
              borderColor: '#1a315b',
              borderRadius: 0,
              marginRight: '46px',
              /*        width: '271px',
            height: '39px', */
            }}
            type="submit"
            // onClick={redirectToProductPage}
          >
            Procedi
          </BlueButton>
        </div>
      </form>
      <AmazonTermsModal
        isOpen={isAmazonTermsModalVisible}
        hideModal={() => setAmazonTermsModalVisibility(false)}
      />
    </div>
  );
};

export default PersonalDetailForm;
