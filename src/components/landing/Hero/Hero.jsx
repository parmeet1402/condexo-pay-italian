import React from 'react';
import Button from '../../common/Button';
import './Hero.scss';
const Hero = () => {
  return (
    <div className="landing-hero">
      <div className="landing-hero-content--container">
        <p className="landing-hero-content">
          Il modo di pagare le tue<span> bollette </span>più{' '}
          <span>rapido </span>e<span> sicuro </span>senza condividere le
          coordinate bancarie
        </p>
        <Button
          color="secondary"
          rounded
          size="large"
          style={{
            marginLeft: '77px',
            marginTop: '100px',
            boxShadow: '0 0 30px 0 rgba(0,0,0,0.15)',
            padding: '16px 75px'
          }}
          className="landing-hero--button"
        >
          Paga le tue Bollette
        </Button>
      </div>
      <div className="landing-hero--background" />
    </div>
  );
};

export default Hero;
