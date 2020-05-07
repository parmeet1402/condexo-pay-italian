import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '../../common/Button';
import { withStyles } from '@material-ui/core/styles';

import './DeleteConfirmModal.scss';

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
const DeleteConfirmModal = ({
  isOpen,
  hideModal,
  handleSubmit,
  setData,
  data,
}) => {
  return (
    <Modal
      aria-labelledby="delete-card-modal"
      aria-describedby="Delete card"
      open={isOpen}
      onClose={() => {
        hideModal();
      }}
      disableBackdropClick={true}
      className="delete-card-modal__container"
    >
      <div className="delete-card-modal">
        <div className="delete-card-modal--content">
          {/* cardOwner */}
          <p>Attenzione!</p>
          <p>Stai per eliminare il metodo di pagamento selezionato.</p>
          <div
            style={{
              textAlign: 'right',
              paddingRight: '6px',
              //   paddingBottom: '30px',
              paddingTop: '50px',
            }}
          >
            <Button
              size="large"
              style={{
                color: '#a4abb5',
                border: '1px solid #a4abb5',
                padding: '12px 23px',
                borderRadius: 0,
                fontSize: '14px',
              }}
              onClick={() => {
                handleSubmit(data);
                setData({});
              }}
            >
              Conferma
            </Button>
            <BlueButton
              type="submit"
              size="large"
              //   color="primary"
              style={{
                padding: '12px 32.5px',
                borderRadius: 0,
                marginLeft: '20px',
                // color: '#1a315b',
                border: '1px solid #1a315b',
                fontSize: '14px',
              }}
              onClick={() => {
                setData({});
                hideModal();
              }}
            >
              Annulla
            </BlueButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
