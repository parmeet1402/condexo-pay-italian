import 'date-fns';
import { subDays } from 'date-fns';
import React, { useState } from 'react';
import TextInput from '../../common/form/TextInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [timePeriod, setTimePeriod] = useState('other');

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
          <div className="filter-header--content">
            <div className="filter-header--content__row">
              <div>
                <InputLabel id="demo-simple-select-label">
                  Seleziona il periodo{' '}
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
                  <MenuItem value={'20'}>Ultimi 20 giorni</MenuItem>
                  <MenuItem value={'30'}>Ultimi 30 giorni</MenuItem>
                  <MenuItem value={'other'}>altra</MenuItem>
                </Select>
              </div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Da"
                value={fromDate}
                onChange={date => setFromDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </div>
            <div className="filter-header--content__row">
              <TextInput
                label="Cerca"
                InputProps={{
                  endAdornment: <FontAwesomeIcon icon={faSearch} />
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="A"
                value={toDate}
                onChange={date => setToDate(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </div>
          </div>
          <div className="filter-header--content__submit">
            <Button
              variant="outlined"
              borderColor="#1a315b"
              style={{ padding: '4px 20px' }}
            >
              <span
                style={{
                  color: '#1a315b',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Conferma
              </span>
            </Button>
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default FilterHeader;
