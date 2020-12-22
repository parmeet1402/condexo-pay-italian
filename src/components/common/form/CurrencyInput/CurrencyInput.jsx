import React from 'react';
import TextInput from '../TextInput';
import './CurrencyInput.scss';
const CurrencyInput = ({
  amountToLeftOfDecimal,
  amountToRightOfDecimal,
  handleInputChange,
  errors = '',
}) => {
  return (
    <div className="currency-input__container">
      <div className="currency-input__field">
        <TextInput
          inputProps={{ maxLength: 4 }}
          label="Importo"
          className="currency-input__field--first"
          name="amountToLeftOfDecimal"
          value={amountToLeftOfDecimal}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.which < 48 || e.which > 57) {
              e.preventDefault();
            }
          }}
          // helperText={errors}
          error={!!errors}
        />
        <span style={!!errors ? { color: '#f44336' } : {}}>,</span>
        <TextInput
          inputProps={{ maxLength: 2 }}
          label="&nbsp;"
          className="currency-input__field--second"
          name="amountToRightOfDecimal"
          value={amountToRightOfDecimal}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.which < 48 || e.which > 57) {
              e.preventDefault();
            }
          }}
          error={!!errors}
        />
        <span style={!!errors ? { color: '#f44336' } : {}}>€</span>
      </div>
      {errors && <p style={{ color: '#f44336', fontSize: '12px' }}>{errors}</p>}
    </div>
  );
};

export default CurrencyInput;
