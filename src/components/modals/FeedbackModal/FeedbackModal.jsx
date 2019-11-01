import React from 'react';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../../common/Button';
import TextInput from '../../common/form/TextInput';
import FilledInput from '@material-ui/core/FilledInput';
import './FeedbackModal.scss';
const FeedbackModal = ({
  isFeedbackModalVisible,
  setFeedbackModalVisibility
}) => {
  return (
    <Modal
      aria-labelledby="feedback-modal"
      aria-describedby="Taking feedback before account deletion"
      open={isFeedbackModalVisible}
      onClose={() => setFeedbackModalVisibility(false)}
      disableBackdropClick={true}
      className="feedback-modal__container"
    >
      <div className="feedback-modal">
        <div className="feedback-modal--header">
          <h2>Chiudi account</h2>
          <FontAwesomeIcon
            onClick={() => setFeedbackModalVisibility(false)}
            style={{ cursor: 'pointer' }}
            icon={faTimes}
            size="2x"
          />
        </div>
        <div className="feedback-modal--content">
          <p>
            Chiudi il tuo account CondexoPay.
            <br />
            Se desideri chiudere il tuo account, clicca su “Chiudi il mio
            account”.
          </p>
          <p>Ci piacerebbe ricevere il tuo feedback</p>
          <FilledInput
            multiline
            disableUnderline
            fullWidth
            rows={5}
            rowsMax={10}
          />
          <div className="feedback-modal--button__container">
            <Button size="large" fullWidth color="primary">
              Chiudi il mio account
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
