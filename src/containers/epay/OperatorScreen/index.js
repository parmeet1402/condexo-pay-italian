import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Radio, TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { debounce, isEmpty } from 'lodash';

import Button from '../../../components/common/Button';
import images from '../../../assets/icons';
import { ViewButton } from '../styles';
import './OperatorScreen.scss';

const OperatorScreen = props => {
  const [viewMore, setViewMore] = useState(false);
  const [filteredOperators, setFilteredOperators] = useState(
    props.otherOperators
  );

  useEffect(() => {
    if (!props.selectedOperator) props.fetchBrands();
  }, []);

  useEffect(() => {
    if (!isEmpty(props.otherOperators) && !props.selectedOperator) {
      setFilteredOperators(props.otherOperators);
    }
  }, [props.otherOperators]);

  const proceedNext = () => {
    props.changeStep(1);
  };

  const handleViewMore = () => {
    setViewMore(prevState => !prevState);
  };

  const handleSearchChange = debounce(search => filterBySearch(search), 300);

  const filterBySearch = filter => {
    const filtered = props.otherOperators.filter(operator =>
      operator.name.toLowerCase().startsWith(filter.toLowerCase())
    );
    setFilteredOperators(filtered);
    setViewMore(true);
  };

  const getOperators = () =>
    (props.mainOperators || []).map(operator => (
      <div className="operator-card" key={operator.name}>
        <img src={operator.icon} alt={operator.name} />
        <Radio
          checked={props.selectedOperator === operator.name}
          value={operator.name}
          onChange={() => props.changeOperator(operator.name)}
          name="radio-operator"
        />
      </div>
    ));

  const getMoreOperators = () =>
    (filteredOperators || []).map(operator => (
      <div className="operator-more" key={operator.name}>
        <Radio
          checked={props.selectedOperator === operator.name}
          value={operator.name}
          onChange={() => props.changeOperator(operator.name)}
          name={operator.name}
        />
        <label htmlFor={operator.name}>{operator.name}</label>
        <img src={operator.icon} alt="operator" />
      </div>
    ));

  const benefitsData = [
    { icon: images.immediate, text: 'Ricarica immediata' },
    { icon: images.secure, text: 'Sicuro e affidabile' },
    { icon: images.free, text: 'Gratis e senza impegno' }
  ];

  const getBenefits = () =>
    benefitsData.map(benefit => (
      <div className="operator-benefit" key={benefit.text}>
        <img src={benefit.icon} alt="benefit" />
        <span>{benefit.text}</span>
      </div>
    ));

  return (
    <div className="operator">
      <div className="operator-container">
        <div className="operator-cards-container">{getOperators()}</div>
        {props.otherOperators && props.otherOperators.length > 0 && (
          <div className="operator-actions-container">
            <TextField
              label="Cerca..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                )
              }}
              onChange={e => handleSearchChange(e.target.value.toLowerCase())}
            />
            <ViewButton
              viewMore={viewMore}
              variant="outlined"
              onClick={handleViewMore}
            >
              Mostra tutti
            </ViewButton>
          </div>
        )}
        {viewMore && (
          <div className="operator-more-container">{getMoreOperators()}</div>
        )}
        <div className="operator-proceed-container">
          <Button
            variant="contained"
            color="secondary"
            onClick={proceedNext}
            disabled={!props.selectedOperator}
          >
            Procedi
          </Button>
        </div>
      </div>
      <div className="operator-benefits-container">{getBenefits()}</div>
    </div>
  );
};

OperatorScreen.propTypes = {
  changeStep: PropTypes.func,
  selectedOperator: PropTypes.string,
  changeOperator: PropTypes.func,
  fetchBrands: PropTypes.func,
  mainOperators: PropTypes.array,
  otherOperators: PropTypes.array
};

export { OperatorScreen };
