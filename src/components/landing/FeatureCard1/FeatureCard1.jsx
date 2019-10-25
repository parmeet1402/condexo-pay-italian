import React from 'react';
import images from '../../../assets/icons';
import Button from '../../common/Button';
import './FeatureCard1.scss';
const FeatureCard1 = () => {
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
          <Button color="secondary" rounded size="large">
            Paga
          </Button>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Bollettini </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
          <Button color="secondary" rounded size="large">
            Paga
          </Button>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Bollettini </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
          <Button color="secondary" rounded size="large">
            Paga
          </Button>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Bollettini </span>
            <img src={images.freeSignUp1} alt="logo" />
          </div>
          <Button color="secondary" rounded size="large">
            Paga
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard1;
