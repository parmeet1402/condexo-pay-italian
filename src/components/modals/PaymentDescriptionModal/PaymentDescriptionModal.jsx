import React from 'react';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Formik } from 'formik';

import './PaymentDescriptionModal.scss';
const PaymentDescriptionModal = props => {
  const {
    isPaymentDescriptionModalVisible,
    setPaymentDescriptionModalVisibility,
    modalData: { card, data, importu, tipologia, beneficiario }
  } = props;
  const renderForm = props => {
    const {
      values: { feedback },
      errors,
      handleChange,
      setFieldTouched
    } = props;
    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };
    return (
      <form
        className="payment-description-modal"
        noValidate
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <div className="payment-description-modal--header">
          <h2>{tipologia || 'Bollettina premarcato'}</h2>
          <FontAwesomeIcon
            onClick={() => setPaymentDescriptionModalVisibility(false)}
            style={{ cursor: 'pointer' }}
            icon={faTimes}
            size="2x"
          />
        </div>
        <div className="payment-description-modal--content">
          <div className="payment-description-modal--row">
            <span>Beneficiario</span>
            <p>{beneficiario || `Condominio via Tamigi, 345/B 00000 ROMA`}</p>
          </div>
          <div className="payment-description-modal--row__alternate">
            <div>
              <span>Data transazione</span>
              <p>{data || `17/04/2019`}</p>
            </div>
            <div>
              <span>Importo</span>
              <p>{importu || `100,49€`}</p>
            </div>
          </div>
          <div className="payment-description-modal--row">
            <span>Pagamento effettuato con:</span>
            <p>Mastercard **** **** **** 8938</p>
          </div>
        </div>
      </form>
    );
  };
  const initialValues = {
    feedback: ''
  };
  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      props.deleteAccountRequest(values.feedback);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      aria-labelledby="payment-description-modal"
      aria-describedby="Taking feedback before account deletion"
      open={isPaymentDescriptionModalVisible}
      onClose={() => setPaymentDescriptionModalVisibility(false)}
      disableBackdropClick={true}
      className="payment-description-modal__container"
    >
      <Formik
        enableReinitialize={true}
        render={props => renderForm(props)}
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default PaymentDescriptionModal;
