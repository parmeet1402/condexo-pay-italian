import React, { Component } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SelectWithSearch.scss';
class SelectWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      dropdownContent: [],
      selectValue: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.dropdownContent.length === 0 &&
      prevState.selectValue.length === 0
    ) {
      if (nextProps.data) {
        return { dropdownContent: nextProps.data };
      }
    } else return null;
  }
  doSearch = e => {
    this.setState({ selectValue: e.target.value }, () => {
      const copyOfSelectValue = this.state.selectValue;
      const copyOfData = [...this.props.data];
      let newData = copyOfData.filter(({ countryName }) =>
        countryName.toLowerCase().includes(copyOfSelectValue.toLowerCase())
      );
      this.setState({ dropdownContent: newData });
    });
  };

  showDropDown = () => {
    this.setState({ isDropdownVisible: true }, () =>
      document.addEventListener('click', this.hideDropDown)
    );
  };

  hideDropDown = event => {
    if (!this.dropdownMenuRef.contains(event.target)) {
      this.setState({ isDropdownVisible: false }, () => {
        document.removeEventListener('click', this.hideDropDown);
      });
    }
  };
  selectFromDropdown = e => {
    this.props.handleSelectChangeProps(e.target.dataset.code);
    this.setState(
      { selectedCountryCode: e.target.dataset.code, isDropdownVisible: false },
      () => {
        document.removeEventListener('click', this.hideDropDown);
      }
    );
  };

  render() {
    return (
      <div
        className="custom-select"
        ref={element => (this.dropdownMenuRef = element)}
      >
        <TextField
          value={this.props.selectValue}
          onClick={this.showDropDown}
          readOnly
          label={this.props.label}
          helperText={this.props.error}
          error={Boolean(this.props.error)}
          className="custom-select__main"
          inputProps={{
            style: { color: 'transparent', textShadow: '0 0 0 #000' }
          }}
          InputProps={{
            endAdornment: (
              <>
                {this.state.isDropdownVisible ? (
                  <InputAdornment position="end">
                    <ArrowDropUpIcon />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <ArrowDropDownIcon />
                  </InputAdornment>
                )}
              </>
            )
          }}
        />
        {this.state.isDropdownVisible && (
          <div className="dropdown">
            <TextField
              value={this.state.selectValue}
              placeholder="Cerca"
              onChange={this.doSearch}
              className="custom-select__search"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faSearch} />
                  </InputAdornment>
                )
              }}
            />
            <ul className="top-results">
              {this.state.dropdownContent.length > 0 ? (
                this.state.dropdownContent.map(({ countryName, code }) => (
                  <li
                    onClick={this.selectFromDropdown}
                    data-code={code}
                    key={`${code}-${countryName}`}
                  >
                    <span data-code={code} className="country">
                      {countryName}
                    </span>
                    <span data-code={code} className="code">
                      {code}
                    </span>
                  </li>
                ))
              ) : (
                <li style={{ fontSize: '12px' }}>No matching country found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default SelectWithSearch;
