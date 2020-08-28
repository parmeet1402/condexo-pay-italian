import React from 'react';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import startCase from 'lodash/startCase';
import icons from '../../../assets/icons';
import { Formik } from 'formik';
import { stringToCurrency } from '../../../utils/currency';
import './PaymentDescriptionModal.scss';
const PaymentDescriptionModal = (props) => {
  const {
    isPaymentDescriptionModalVisible,
    setPaymentDescriptionModalVisibility,
    modalData: {
      cardNo,
      cardType,
      data,
      importo,
      tipologia,
      beneficiario,
      timestamp,
      description,
      productType,
      mobileNo,
      pinNo,
      serialNo,
      websiteURL,
    },
  } = props;

  const renderTypeLogo = (type) => {
    switch (type) {
      case 'Ricarica telefonica':
        return <img src={icons.bollettini} alt="bollettini" />;
      default:
        return <span />;
    }
  };

  const renderForm = (props) => {
    const {
      values: { feedback },
      errors,
      handleChange,
      setFieldTouched,
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
          <h2>{startCase(tipologia) || 'Bollettina premarcato'}</h2>
          <FontAwesomeIcon
            onClick={() => setPaymentDescriptionModalVisibility(false)}
            style={{ cursor: 'pointer' }}
            icon={faTimes}
            size="2x"
          />
        </div>
        <div className="payment-description-modal--content">
          <div className="payment-description-modal--content--upper">
            <div className="payment-description-modal--content--upper__left">
              {renderTypeLogo(tipologia)}
              <div style={{ marginLeft: '36px' }}>
                <div>
                  <span className="payment-description-modal--content--upper__left--date">
                    {data}
                  </span>
                  <span className="payment-description-modal--content--upper__left--timestamp">
                    {timestamp}
                  </span>
                </div>
                <div style={{ marginTop: '7px' }}>
                  {productType || 'Pagamento rata'}
                </div>
              </div>
            </div>
            <div className="payment-description-modal--content--upper__right">
              <span>{stringToCurrency(importo)}</span>
            </div>
          </div>
          <div className="payment-description-modal--content--lower">
            <div className="payment-description-modal--content--lower__left">
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{
                  color: '#4a90e2',
                  fontSize: '30px',
                  marginLeft: '14px',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div className="payment-description-modal--content--lower__right">
              <div className="payment-description-modal--row">
                <span>Beneficiario</span>
                <p>{beneficiario}</p>
              </div>
              <div className="payment-description-modal--row">
                <span>Pagamento effettuato con:</span>
                <p style={{ textTransform: 'capitalize' }}>
                  {cardType || ''} **** **** **** {cardNo || ''}
                </p>
              </div>
              {mobileNo && (
                <div className="payment-description-modal--row">
                  <span>Cellulare</span>
                  <p>{mobileNo || ''}</p>
                </div>
              )}
              {serialNo && (
                <div className="payment-description-modal--row">
                  <span>Numero di serie</span>
                  <p>{serialNo || ''}</p>
                </div>
              )}
              {pinNo && (
                <div className="payment-description-modal--row">
                  <span>Codice PIN</span>
                  <p>{pinNo || ''}</p>
                </div>
              )}
              {description ? (
                <>
                  <p
                    style={{
                      color: '#999',
                      lineHeight: 1.89,
                      fontSize: '12px',
                      width: '90%',
                    }}
                  >
                    {description.substr(0, description.indexOf('http'))}
                  </p>
                  <a
                    href={websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: '#4a90e2',
                      borderBottom: '1px solid #4a90e2',
                    }}
                  >
                    <p
                      style={{
                        color: '#999',
                        lineHeight: 1.89,
                        fontSize: '12px',
                        width: '90%',
                      }}
                    >
                      {description.substr(description.indexOf('http'))}
                    </p>
                  </a>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* <div className="payment-description-modal--row">
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
              <p>{importo + '€' || `100,49€`}</p>
            </div>
          </div>
          <div className="payment-description-modal--row">
            <span>Pagamento effettuato con:</span>
            <p style={{ textTransform: 'capitalize' }}>
              {cardType || ''} **** **** **** {cardNo || ''}
            </p>
          </div> */}
        </div>
      </form>
    );
  };
  const initialValues = {
    feedback: '',
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
        render={(props) => renderForm(props)}
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default PaymentDescriptionModal;
