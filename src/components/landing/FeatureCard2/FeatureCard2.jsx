import React from 'react';
import images from '../../../assets/icons';
import './FeatureCard2.scss';
const FeatureCard2 = () => {
  return (
    <div className="landing-feature-1">
      <h2 className="landing-feature-1--heading">Semplificati la vita!</h2>
      <h2 className="landing-feature-1--heading">
        Scegli il pagamento che ti occorre.
      </h2>
      <div className="landing-feature-1--cards">
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Bollettini </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Rate </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Mav / Rav </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Paga con il telefono </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard2;
