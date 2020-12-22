import React, { useState, useEffect, useRef } from 'react';
// import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import icons from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import { updateData, decodeBarcode } from './utils';
import { billPaymentBarCode } from '../../../assets/images';
import './ScanCode.scss';

const inputMethods = {
  automatic: 'AUTOMATIC',
  manual: 'MANUAL',
};

const DarkBlueCheckbox = withStyles({
  root: {
    color: '#979797',
    borderRadius: '4',
    '&$checked': {
      color: '#4a90e2',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ScanCode = ({ hideModal, updateKeys }) => {
  const [inputMethod, setInputMethod] = useState(inputMethods.automatic);
  const [barcodeResult, setBarcodeResult] = useState('');
  const isAutomatic = inputMethod === inputMethods.automatic;
  const isManual = inputMethod === inputMethods.manual;
  const [isAccepted, setIsAccepted] = useState(false);
  const [isInformationScreenVisible, setInformationScreenVisibility] = useState(
    true
  );

  const inputEl = useRef(null);

  const onCodeDetected = (barcode) => {
    updateData(decodeBarcode(barcode), updateKeys);
    hideModal();
  };

  const handleManualFormSubmit = (e) => {
    e.preventDefault();
    onCodeDetected(inputEl.current.value);
  };

  const handleBarCodeUpdate = (err, { text } = {}) => {
    if (text) {
      onCodeDetected(text);
    } else {
      // console.log('NOT CORRECT CODE', 'TURN RED');
    }
  };

  useEffect(() => {
    if (isManual) {
      inputEl.current.focus();
    }
  }, [isManual]);

  const handleTabClick = (e) => {
    setInputMethod(e.target.dataset.name);
  };
  useEffect(() => {
    console.log(barcodeResult);
  }, [barcodeResult]);
  return (
    <div className="scan-code-modal">
      <div className="scan-code-modal__header">
        <div className="scan-code-modal__tab__container">
          <div
            className={`scan-code-modal__tab scan-code-modal__tab--left ${
              isAutomatic ? 'scan-code-modal__tab--active' : ''
            }`}
            onClick={handleTabClick}
            data-name={inputMethods.automatic}
          >
            SCANNERIZZA
          </div>
          <div
            className={`scan-code-modal__tab scan-code-modal__tab--right ${
              isManual ? 'scan-code-modal__tab--active' : ''
            }`}
            onClick={handleTabClick}
            data-name={inputMethods.manual}
          >
            DIGITA CODICE
          </div>
        </div>
      </div>
      {isAutomatic && (
        <>
          {isInformationScreenVisible ? (
            <div className="scan-code-modal__info-screen">
              <div className="scan-code-modal__info-screen__header">
                Acquisizione codice
              </div>
              <img
                src={billPaymentBarCode}
                alt="information"
                className="scan-code-modal__info-screen__img"
              />
              <p className="scan-code-modal__info-screen__paragraph">
                Con questa operazione si utilizza la fotocamera del dispositivo
                per acquisire il codice grafico (Datamatrix) che compare sul
                bollettino per riempire automaticamente i campi del bollettino.
              </p>
              <FormControlLabel
                control={
                  <DarkBlueCheckbox
                    checked={isAccepted}
                    onChange={() => setIsAccepted((isAccepted) => !isAccepted)}
                    value="checked"
                    color="primary"
                    // label="dsaf"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                // label="sdaf"
                label={
                  <span className="scan-code-modal__info-screen__label">
                    Non mostrare pii questo messaggio
                  </span>
                }
              />
              <div className="scan-code-modal__info-screen__footer">
                <button
                  className="scan-code-modal__info-screen__button scan-code-modal__info-screen__button--cancel"
                  onClick={hideModal}
                >
                  ANNULLA
                </button>
                <button
                  className="scan-code-modal__info-screen__button scan-code-modal__info-screen__button--ok"
                  onClick={() => {
                    if (isAccepted) {
                      setInformationScreenVisibility(false);
                    }
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div className="scan-code-modal__content scan-code-modal__content--automatic">
              <div className="scan-code-modal__shutter__container">
                <div className="scan-code-modal__shutter scan-code-modal__shutter--top-left"></div>
                <div className="scan-code-modal__shutter scan-code-modal__shutter--top-right"></div>
                <div className="scan-code-modal__shutter scan-code-modal__shutter--bottom-left"></div>
                <div className="scan-code-modal__shutter scan-code-modal__shutter--bottom-right"></div>
              </div>
              <div className="scan-code-modal__label">
                Inquadra il codice con il telefono.{' '}
              </div>
              <BarcodeScannerComponent
                width={window.innerWidth}
                height={window.innerHeight - 160}
                onUpdate={handleBarCodeUpdate}
              />
            </div>
          )}
        </>
      )}
      {isManual && (
        <div className="scan-code-modal__content scan-code-modal__content--manual">
          <form
            className="scan-code-modal__popup"
            onSubmit={handleManualFormSubmit}
          >
            <span className="scan-code-modal__popup__label">
              Inserisci il codice a barre
            </span>
            <input
              ref={inputEl}
              type="number"
              className="scan-code-modal__popup__input"
            />
            <div className="scan-code-modal__popup__footer">
              <div
                className="scan-code-modal__popup__footer__button"
                onClick={hideModal}
              >
                Cancel
              </div>
              <div
                className="scan-code-modal__popup__footer__button"
                onClick={handleManualFormSubmit}
              >
                OK
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScanCode;
