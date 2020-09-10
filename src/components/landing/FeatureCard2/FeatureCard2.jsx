import React from 'react';
import { Link } from 'react-router-dom';
import { landingFeature2 } from '../../../assets/images';
import Button from '../../common/Button';

import './FeatureCard2.scss';
const FeatureCard2 = () => {
  return (
    <div className="landing-feature-2">
      <div className="landing-feature-2--content">
        <h2>Ricariche telefoniche e gift card sempre e ovunque</h2>
        <p>
          Puoi ricaricare il telefono o acquistare gift card e ricariche per una
          grande varietà di servizi e prodotti in un unico posto
        </p>
        <Link to="/registrazione" style={{ textDecoration: 'none' }}>
          <Button
            // color="secondary"
            // rounded
            size="large"
            className="landing-feature-2--content__button"
          >
            REGISTRATI ADESSO! E’ GRATIS!
          </Button>
        </Link>
      </div>
      <div className="landing-feature-2--img__wrapper">
        <img src={landingFeature2} alt="tesgt" />
      </div>
    </div>
  );
};

export default FeatureCard2;
