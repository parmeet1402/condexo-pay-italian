import React from 'react';
import Modal from '@material-ui/core/Modal';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import TextInput from '../../common/form/TextInput';
import Button from '../../common/Button';
import './SearchPaymentMobileModal.scss';

const SearchPaymentMobileModal = ({
  timePeriod,
  setTimePeriod,
  handleSelectChange,
  searchText,
  setSearchText,
  handleChange,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  show,
  onClose,
  resetData,
}) => {
  return (
    <Modal
      aria-labelledby="search-payment-mobile-modal"
      aria-describedby="Searching through transactions"
      open={show}
      onClose={onClose}
      disableBackdropClick={true}
      className="search-payment-mobile-modal__container"
    >
      <div className="search-payment-mobile-modal__container--inner">
        <div className="search-payment-mobile-modal__header">
          <h2>Filtra per:</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="search-payment-mobile-modal__header__close-icon"
            onClick={onClose}
          />
        </div>
        <div className="search-payment-mobile-modal__body">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Seleziona il periodo{' '}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Seleziona il periodo"
              value={timePeriod}
              onChange={handleSelectChange}
              fullWidth
            >
              <MenuItem value={'10'}>Ultimi 10 giorni</MenuItem>
              <MenuItem value={'30'}>Ultimi 30 giorni</MenuItem>
              <MenuItem value={'90'}>Ultimi 90 giorni</MenuItem>
            </Select>
          </FormControl>
          <div className="field-wrapper">
            <TextInput
              // variant="outlined"
              label="Inserisci testo"
              size="normal"
              fullWidth
              value={searchText}
              onChange={handleChange}
              InputProps={{
                endAdornment: <FontAwesomeIcon icon={faSearch} />,
              }}
              placeholder="Inserisci testo"
            />
          </div>
          <div className="date-wrapper">
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              // label="Da"
              placeholder="Da:"
              value={fromDate}
              onChange={(date) => setFromDate(date) || setTimePeriod('')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <div className="date-wrapper">
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              // label="A"
              placeholder="A:"
              value={toDate}
              onChange={(date) => setToDate(date) || setTimePeriod('')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            borderColor="#2443ca"
            style={{
              color: '#2443ca',
              border: '1px solid',
              padding: '13px 8px',
              marginTop: '60px',
              boxShadow: '0 2px 4px 0 rgba(209, 209, 209, 0.5)',
            }}
            onClick={onClose}
          >
            <span style={{ fontSize: '18px' }}>Conferma</span>
          </Button>
          <Button
            type="reset"
            fullWidth
            borderColor="#929292"
            style={{
              color: '#929292',
              border: '1px solid',
              padding: '13px 8px',
              marginTop: '16px',
              boxShadow: '0 2px 4px 0 #929292',
            }}
            onClick={resetData}
          >
            <span style={{ fontSize: '18px' }}>Resetta filtri</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchPaymentMobileModal;
