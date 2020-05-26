import React from 'react';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';
import { smoothScroll } from '../../../utils';
import { landingHero } from '.././../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './Hero.scss';
const Hero = ({ featureCard1Ref }) => {
  return (
    <div className="landing-hero">
      <div className="landing-hero-content--container">
        <div className="landing-hero-content">
          <h3>Pagare rate e bollette sarà facilissimo</h3>
          <p>
            Gestisci rate, bollette e ricariche in modo rapido e sicuro, tutto
            in un unico posto.
          </p>
        </div>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            // color="secondary"
            // rounded
            size="large"
            style={{
              marginLeft: '77px',
              marginTop: '100px',
              boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)',
              padding: '16px 75px',
              backgroundColor: '#3c99fc',
              color: 'white',
              textTransform: 'uppercase',
            }}
            className="landing-hero--button"
          >
            Paga Ora
          </Button>
        </Link>
      </div>
      <div
        className="landing-hero__go-down"
        onClick={() => smoothScroll(featureCard1Ref)}
      >
        <FontAwesomeIcon
          className="landing-hero__go-down__icon"
          icon={faAngleDown}
        />
      </div>

      {/* <img src={landingHero} alt="hero" /> */}
      {/* <div className="landing-hero--background" /> */}
    </div>
  );
};

export default Hero;
