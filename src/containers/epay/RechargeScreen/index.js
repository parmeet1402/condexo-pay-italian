import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Radio,
  Box,
  InputAdornment,
  Button
} from '@material-ui/core';
import clsx from 'classnames';

import { icons } from '../utils';
import { Tooltip } from '../../../components/common/Tooltip';
import './RechargeScreen.scss';

const TOOLTIP_TITLE =
  'Per procedere e necessario accettare le condiziani generali';

const RechargeScreen = props => {
  const [errors, setErrors] = useState({
    number: null,
    confirmNumber: null,
    optionalEmail: null,
    amount: null
  });

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (props.reserveTransactionId) handleStepForward();
  }, [props.reserveTransactionId]);

  const handleValidation = () => {
    let isValid = true;

    if (!props.rechargeForm.number) {
      setError('number', 'Phone number is required.');
      isValid = false;
    } else setError('number', null);

    if (!props.rechargeForm.confirmNumber) {
      setError('confirmNumber', 'Phone number is required.');
      isValid = false;
    } else if (props.rechargeForm.number !== props.rechargeForm.confirmNumber) {
      setError('confirmNumber', 'The two numbers do not match.');
      isValid = false;
    } else setError('confirmNumber', null);

    if (
      props.rechargeForm.optionalEmail &&
      !validateEmail(props.rechargeForm.optionalEmail)
    ) {
      setError('optionalEmail', 'Please enter a valid email.');
      isValid = false;
    } else setError('optionalEmail', null);

    if (!props.rechargeForm.amount.value) {
      setError('amount', 'Please select an amount.');
      isValid = false;
    } else {
      setError('amount', null);
    }

    if (!props.rechargeForm.privacy) {
      isValid = false;
    }

    return isValid;
  };

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);

  const setError = (name, error) => {
    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }));
  };

  const handleInputChange = ({ target }) => {
    props.changeRechargeForm(target.name, target.value);
  };

  const handleStepBack = () => {
    props.changeStep(0);
  };

  const handleStepForward = () => {
    props.changeStep(2);
  };

  const handleMobileTopup = () => {
    if (handleValidation()) props.mobileTopup();
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const getRechargeAmounts = () =>
    props.amounts.map(amount => (
      <span
        key={amount.value}
        onClick={() => props.changeRechargeForm('amount', amount)}
        className={clsx('recharge-amount', {
          'recharge-amount--selected':
            props.rechargeForm.amount.value === amount.value
        })}
      >
        {amount.value}
      </span>
    ));

  return (
    <div className="recharge">
      <div className="recharge-content">
        <div className="recharge-header">
          <h2>Ricarica singola</h2>
          <img src={icons[props.operator]} alt="operator" />
        </div>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label>{`Numero ${props.operator.toUpperCase()} da ricaricare`}</label>
              <TextField
                label="Numero"
                value={props.rechargeForm.number}
                name="number"
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+39</InputAdornment>
                  ),
                  type: 'number'
                }}
                fullWidth
                error={!!errors.number}
                helperText={errors.number}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Conferma numero</label>
              <TextField
                label="Numero"
                name="confirmNumber"
                value={props.rechargeForm.confirmNumber}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+39</InputAdornment>
                  ),
                  type: 'number'
                }}
                fullWidth
                error={!!errors.confirmNumber}
                helperText={errors.confirmNumber}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label>Importo della ricarica</label>
              <div className="recharge-amount-container">
                {getRechargeAmounts()}
                {errors.amount && (
                  <span className="recharge-amount-error">{errors.amount}</span>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className="recharge-optional-email">
              <TextField
                label="Inserisci il tuo Indirizzo mail per la notifica (opzionale)"
                name="optionalEmail"
                InputProps={{
                  type: 'email'
                }}
                onChange={handleInputChange}
                value={props.rechargeForm.optionalEmail}
                fullWidth
                error={!!errors.optionalEmail}
                helperText={errors.optionalEmail}
              />
            </Grid>
          </Grid>
        </Box>
        <Box my={3} className="recharge-privacy">
          <span>
            {showTooltip && (
              <Tooltip className="epay-tooltip">{TOOLTIP_TITLE}</Tooltip>
            )}
            <Radio
              checked={props.rechargeForm.privacy === true}
              onClick={() => {
                props.togglePrivacy();
              }}
              value={props.changeRechargeForm.privacy}
            />
          </span>
          <span>Accetto le condizioni del servizio e informativa privacy</span>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            size="large"
            onClick={handleStepBack}
            style={{ textTransform: 'capitalize' }}
          >
            Indietro
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            disabled={props.isLoading}
            onClick={handleMobileTopup}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ textTransform: 'capitalize' }}
          >
            Procedi
          </Button>
        </Box>
      </div>
    </div>
  );
};

RechargeScreen.propTypes = {
  operator: PropTypes.string,
  rechargeForm: PropTypes.shape({
    number: PropTypes.string,
    confirmNumber: PropTypes.string,
    amount: PropTypes.shape({
      value: PropTypes.number,
      eanNO: PropTypes.string
    }),
    optionalEmail: PropTypes.string,
    privacy: PropTypes.bool
  }),
  changeStep: PropTypes.func,
  changeRechargeForm: PropTypes.func,
  togglePrivacy: PropTypes.func,
  amounts: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      eanNO: PropTypes.string
    })
  ),
  mobileTopup: PropTypes.func,
  reserveTransactionId: PropTypes.string,
  isLoading: PropTypes.bool
};

export { RechargeScreen };
