import React from 'react';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './AmazonTermsModal.scss';

const AmazonTermsModal = ({ isOpen, hideModal }) => {
  return (
    <Modal
      aria-labelledby="amazon-terms-modal"
      aria-describedby="Terms modal"
      open={isOpen}
      onClose={hideModal}
      disableBackdropClick={true}
      className="amazon-terms-modal__container"
    >
      <div className="amazon-terms-modal">
        <div className="amazon-terms-modal__header">
          <h2>Amazon Ricarica il tuo conto Online</h2>
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            style={{ cursor: 'pointer' }}
            onClick={hideModal}
          />
        </div>
        <div className="amazon-terms-modal__content">
          <p>
            Come funziona:
            <br /> Per il codice a barre è necessario:
          </p>
          <br />
          <ul>
            <li>
              - Inserire il valore del codice a barre identificativo
              dell’account ottenuto dal sito o dell’App Amazon.it.
            </li>
            <li>
              - Scarica il tuo codice a barre su un Pc o telefono e usa un app
              di lettura Qr e Codici per scoprire il valore del codice. Scopri
              qui (
              <a
                href="https://www.amazon.it/b/?node=13829824031"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.amazon.it/b/?node=13829824031
              </a>
              ) come fare.
            </li>
            <li>- Inserire l’importo da caricare (libero da 5 a 500 Euro)</li>
            <li>- Effettuare il pagamento con carta di credito</li>
            <li>- Il conto verrà subito ricaricato</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default AmazonTermsModal;
