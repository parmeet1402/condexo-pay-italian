import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
const BlueButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#1a315b',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#1a315b',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: '#1a315b',
      boxShadow: 'none',
      color: '#1a315b',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#1a315b',
    },
    '&:focus': {},
  },
})(Button);

const SidebarAlert = ({ receiptLink }) => {
  return (
    <div
      className="pay-your-bill__sidebar"
      style={{
        height: '335px',
        boxShadow: '0 4px 12px 0 rgba(26, 49, 91, 0.61)',
      }}
    >
      <div className="pay-your-bill__sidebar__header">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          style={{ marginRight: '21px' }}
        />
        Ricorda
      </div>

      <div className="pay-your-bill__sidebar__content">
        <p style={{ fontSize: '20px', textAlign: 'left' }}>
          Questa pagina non attesta l’avvenuto pagamento, scarica la ricevuta
          emessa cliccando qui
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
          href={receiptLink}
        >
          <BlueButton
            style={{ width: '90%', height: '56px', marginTop: '52px' }}
            // onClick={handleButtonClick}
          >
            Scarica la ricevuta
          </BlueButton>
        </a>
      </div>
    </div>
  );
};

export default SidebarAlert;
