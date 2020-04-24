import 'date-fns';
import { subDays } from 'date-fns';
import React, { useState } from 'react';
import TextInput from '../../common/form/TextInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import Button from '../../common/Button';
import './FilterHeader.scss';
const FilterHeader = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

  const handleSelectChange = e => {
    const value = e.target.value;
    setTimePeriod(value);
    if (value !== 'other') {
      setToDate(new Date());
      setFromDate(subDays(new Date(), parseInt(value)));
    }
  };

  console.log(subDays(new Date(), 10));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="filter-header">
        <div className="filter-header--content__container">
          <div className="filter-header--content__row">
            <div className="filter-header--content__row--left">
              <div className="field-wrapper">
                <TextInput
                  variant="outlined"
                  label="Cerca"
                  size="normal"
                  InputProps={{
                    endAdornment: <FontAwesomeIcon icon={faSearch} />
                  }}
                  placeholder="Inserisci testo"
                />
              </div>
              <div className="date-wrapper">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  // label="Da"
                  placeholder="Da"
                  value={fromDate}
                  onChange={date => setFromDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
              <div className="date-wrapper">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  // label="A"
                  placeholder="A"
                  value={toDate}
                  onChange={date => setToDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
              <div className="filter-header--content__submit">
                <Button>
                  <span>Filtra</span>
                </Button>
              </div>
            </div>
            <div className="filter-header--content__row--right">
              <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Seleziona il periodo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Seleziona il periodo "
                  value={timePeriod}
                  onChange={handleSelectChange}
                  fullWidth
                >
                  <MenuItem value={'10'}>Ultimi 10 giorni</MenuItem>
                  <MenuItem value={'30'}>Ultimi 30 giorni</MenuItem>
                  <MenuItem value={'90'}>Ultimi 90 giorni</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default FilterHeader;
