import 'date-fns';
import { subDays } from 'date-fns';
import React, { useState, useEffect } from 'react';
import TextInput from '../../common/form/TextInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import debounce from 'lodash/debounce';
import { SearchPaymentMobileModal } from '../../../components/modals';
import Button from '../../common/Button';
import './FilterHeader.scss';
const FilterHeader = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setTimePeriod,
  timePeriod,
  searchText,
  setSearchText,
  filterData,
  isMobileSearchModalVisible,
  setMobileSearchModalVisibility,
}) => {
  /* const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
   */

  useEffect(() => {
    filterData();
  }, [searchText]);

  // const debounceSearch = debounce(() => {
  // filterData();
  // console.log('THROTTLED');
  // }, 500);

  // useEffect(debounce(filterData, 500), [fromDate, toDate, searchText]);
  // const doSearch = () => debounce(()=> console.log("SDaf"), 150);
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setTimePeriod(value);
    if (value !== 'other') {
      setToDate(new Date());
      setFromDate(subDays(new Date(), parseInt(value)));
    }
    // console.log('one');
    // debounceSearch();
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
    // console.log('one');
    // debounceSearch();
  };

  const resetData = () => {
    setSearchText('');
    setToDate(null);
    setFromDate(null);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="filter-header">
        <div className="filter-header--content__container">
          <div className="filter-header--content__row">
            <form
              className="filter-header--content__row--left"
              onSubmit={(e) => {
                e.preventDefault();
                filterData();
              }}
            >
              <div className="field-wrapper">
                <TextInput
                  variant="outlined"
                  label="Cerca"
                  size="normal"
                  value={searchText}
                  false
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
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  // label="Da"
                  placeholder="Da"
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
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  // label="A"
                  placeholder="A"
                  value={toDate}
                  onChange={(date) => setToDate(date) || setTimePeriod('')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </div>
              {/* <div
                // style={{ cursor: 'pointer' }}
                > */}
              <Button
                className="filter-header--content__submit"
                onClick={filterData}
                // type="submit"
                startIcon={
                  <FontAwesomeIcon
                    icon={faFilter}
                    style={{ fontSize: '14px' }}
                  />
                }
              >
                <span>Filtra</span>
              </Button>
              {/* </div> */}
              {/* <div
                // style={{ cursor: 'pointer' }}
              > */}
              <Button
                className="filter-header--content__reset"
                // type="reset"
                onClick={resetData}
                startIcon={
                  <FontAwesomeIcon
                    icon={faRedoAlt}
                    style={{ fontSize: '14px' }}
                  />
                }
              >
                <span>Resetta filtri</span>
              </Button>
              {/* </div> */}
            </form>
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
        <SearchPaymentMobileModal
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          handleSelectChange={handleSelectChange}
          searchText={searchText}
          handleChange={handleChange}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          show={isMobileSearchModalVisible}
          onClose={() => setMobileSearchModalVisibility(false)}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default FilterHeader;
