import React from 'react';
import Button from '../../common/Button';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './FeatureCard4.scss';
const FeatureCard4 = React.forwardRef((props, ref) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  return (
    <div className="landing-feature-4" ref={ref}>
      <div className="landing-feature-4--top-section">
        <h2>Puoi dire addio alle inutili file per pagare le tue bollette</h2>
        <p>
          Paga le tue rate o le tue bollette velocemente con il{' '}
          <span>QR code</span>
        </p>
      </div>
      <Button
        // color="secondary"
        // rounded
        size="large"
        style={
          isMobile
            ? {
                backgroundColor: '#3c99fc',
                boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)',
                padding: '16px 75px',
                textTransform: 'uppercase',
                color: 'white',
                display: 'block',
                margin: '50px auto 51px',
                width: 'calc(100% - 28px)',
              }
            : {
                marginLeft: '77px',
                marginTop: '100px',
                boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)',
                padding: '16px 75px',
                backgroundColor: '#3c99fc',
                textTransform: 'uppercase',
                color: 'white',
              }
        }
        className="landing-feature-4--top-section__button"
      >
        SCANNERIZZA IL CODICE
      </Button>
      <div>
        <div className="landing-feature-4--left-section">
          <p>
            Ti basterà inquadrare, con il tuo telefono, il codice che trovi
            sulle tue bollette per visualizzare tutti i dettagli di pagamento
          </p>
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
      </div>
    </div>
  );
});

export default FeatureCard4;
