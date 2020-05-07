import React from 'react';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import TextInput from '../../common/form/TextInput';
import Button from '../../common/Button';
import icons from '../../../assets/icons';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import './EditCardModal.scss';

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
      color: 'white',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
    },
    '&:focus': {},
  },
})(Button);
const EditCardModal = ({ isOpen, data, hideModal, setData, handleSubmit }) => {
  const { nameOnCard, cardType, cardNumber, expiryDate } = data;
  return (
    <Modal
      aria-labelledby="edit-card-modal"
      aria-describedby="Edit card"
      open={isOpen}
      onClose={() => {
        setData({});
        hideModal();
      }}
      disableBackdropClick={true}
      className="edit-card-modal__container"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!!data.nameOnCard) {
            console.log(data);
            const { _id: cardId } = data;
            handleSubmit({ cardId, expiryDate, nameOnCard });
          } else {
            // throw new Error('name no card is required');
            // setErrors({ ...errors, nameOnCard: 'Name is required' });
          }
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="edit-card-modal">
            <div className="edit-card-modal--header">
              <h2>Modifica dati</h2>
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                style={{ cursor: 'pointer' }}
                onClick={hideModal}
              />
            </div>
            <div className="edit-card-modal--content">
              {/* cardOwner */}
              <div className="edit-card-modal--form--row">
                <TextInput
                  name="cardOwner__filled"
                  label="Proprietario della carta"
                  fullWidth
                  value={nameOnCard}
                  onChange={(e) =>
                    setData({ ...data, nameOnCard: e.target.value })
                  }
                />
                {/* cardType */}
                <TextInput
                  name="cardType__filled"
                  label="Tipologia"
                  fullWidth
                  value={cardType}
                  disabled
                />
              </div>
              {/* --- */}
              {/* cardNumber */}
              <div className="edit-card-modal--form--row">
                <TextInput
                  name="cardNumber__filled"
                  label="Numero carta"
                  fullWidth
                  value={`XXXX-XXXX-XXXX-${cardNumber}`}
                  disabled
                />
              </div>
              {/* --- */}
              {/* expiry */}
              <div className="edit-card-modal--form--row">
                {/* <TextInput
              name="cardExpiry__filled"
              label="Scadenza"
              value={expiryDate}
              style={{ width: '60%' }}
            /> */}

                <div className="date-wrapper">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/yy"
                    margin="normal"
                    id="date-picker-inline"
                    // label="Da"
                    placeholder="Da"
                    value={expiryDate}
                    onChange={(date) => setData({ ...data, expiryDate: date })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    minDate={new Date()}
                  />
                </div>
                {/* CVC */}
                <TextInput
                  name="cardCvc__filled"
                  label="Codice CVC/CVV"
                  fullWidth
                  value={'***'}
                  disabled
                />
                {/* icon */}
                <img src={icons.cvvInfo} alt="cvv" />
              </div>
            </div>
            <div
              style={{
                textAlign: 'right',
                paddingRight: '30px',
                paddingBottom: '30px',
              }}
            >
              <Button
                size="large"
                style={{
                  color: '#a4abb5',
                  border: '1px solid #a4abb5',
                  padding: '12px 34px',
                  borderRadius: 0,
                }}
                onClick={() => {
                  setData({});
                  hideModal();
                }}
              >
                Annulla
              </Button>
              <BlueButton
                type="submit"
                size="large"
                //   color="primary"
                style={{
                  padding: '12px 30px',
                  borderRadius: 0,
                  marginLeft: '20px',
                  // color: '#1a315b',
                  border: '1px solid #1a315b',
                }}
              >
                Conferma
              </BlueButton>
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </form>
    </Modal>
  );
};

export default EditCardModal;
