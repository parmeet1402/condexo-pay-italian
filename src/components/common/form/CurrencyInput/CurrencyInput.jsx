import React from 'react';
import TextInput from '../TextInput';
import './CurrencyInput.scss';
const CurrencyInput = () => {
  return (
    <div className="currency-input__container">
      <div className="currency-input__field">
        <TextInput label="Importo" className="currency-input__field--first" />
        <span>,</span>
        <TextInput
          inputProps={{ maxLength: 2 }}
          label="&nbsp;"
          className="currency-input__field--second"
        />
        <span>€</span>
      </div>
    </div>
  );
};

export default CurrencyInput;
