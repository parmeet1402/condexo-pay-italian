import React from 'react';
import Button from '../../common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './FeatureCard4.scss';
const FeatureCard4 = () => {
  return (
    <div className="landing-feature-4">
      <div>
        <div className="landing-feature-4--left-section">
          <h2 className="landing-feature-4--heading">
            Puoi dire addio alle inutili file per pagare le tue bollette
          </h2>
          <ul className="landing-feature-4--list">
            <li>
              <FontAwesomeIcon
                style={{ color: '#1a315b', width: '30.3px', height: '30.3px' }}
                icon={faCheckCircle}
              />
              <div>
                <span>Salva</span> i tuoi metodi di pagamento preferiti, non
                dovrai inerirli al tuo successivo pagamento
              </div>
            </li>
            <li>
              <FontAwesomeIcon
                style={{ color: '#1a315b', width: '30.3px', height: '30.3px' }}
                icon={faCheckCircle}
              />
              <div>Vedi la lista dei tuoi pagamenti</div>
            </li>
            <li>
              <FontAwesomeIcon
                style={{ color: '#1a315b', width: '30.3px', height: '30.3px' }}
                icon={faCheckCircle}
              />
              <div>
                <span>Ricarica</span> il tuo telefono e acquista i servizi di
                cui hai bisogno
              </div>
            </li>
          </ul>
        </div>
        <div className="landing-feature-4--right-section">
          <p>
            Paga online le tue rate, scatta una foto al codice del bollettino
            per pagare ancora piu velocemente da telefono e registrati per avere
            tutti i vantaggi di condexo pay.
          </p>
          <Link to="/register">
            <Button
              size="large"
              rounded
              color="secondary"
              className="landing-feature-4--button"
            >
              Registrati
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard4;
