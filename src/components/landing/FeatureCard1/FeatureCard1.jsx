import React from 'react';
import icons from '../../../assets/icons';
import {
  landingFeature1GiftCard,
  landingFeature1Bollettini,
  landingFeature1Rate,
  landingFeature1Mav,
} from '../../../assets/images';
import Button from '../../common/Button';
import './FeatureCard1.scss';
const FeatureCard1 = React.forwardRef((props, ref) => {
  return (
    <div className="landing-feature-1" ref={ref}>
      <h2 className="landing-feature-1--heading">Semplificati la vita!</h2>
      <h2 className="landing-feature-1--heading">
        Paga adesso, non occorre la registrazione!
      </h2>
      <div className="landing-feature-1--cards">
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card gift-card">
            <div className="landing-feature-1--card__content gift-card">
              <img
                src={landingFeature1GiftCard}
                alt="gift card"
                style={{
                  marginTop: '51px',
                  width: '162px',
                }}
              />
              <div className="overlay">
                <div className="overlay--upper">
                  <img src={icons.landingGiftCard} alt="gift-card" />
                  <div>
                    <h4>Compra</h4>
                    <span>Ricariche e GiftCard</span>
                  </div>
                </div>
                <p>
                  Ricarica il tuo telefono in modo rapido e sicuro. Sono
                  disponibili 10 operatori telefonici.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card bollettini">
            <div className="landing-feature-1--card__content bollettini">
              <img
                src={landingFeature1Bollettini}
                alt="bollettini"
                style={{
                  marginTop: '56px',
                  width: '155px',
                }}
              />
              <div className="overlay">
                <div className="overlay--upper">
                  <img
                    src={icons.landingBulletin}
                    alt="gift-card"
                    style={{
                      transform: 'scale(0.7) translateX(-18px)',
                    }}
                  />
                  <div>
                    <h4>Paga</h4>
                    <span>Bollettini</span>
                  </div>
                  Ricariche
                </div>
                <p>
                  Paga le tue bollette comodamente dal tuo Pc o da tuo telefono.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card rate">
            <div className="landing-feature-1--card__content rate">
              <img
                src={landingFeature1Rate}
                alt="rate"
                style={{
                  marginTop: '69px',
                  transform: 'scale(1.1)',
                  width: '150px',
                }}
              />
              <div className="overlay">
                <div className="overlay--upper">
                  <img src={icons.landingRate} alt="gift-card" />
                  <div>
                    <h4>Paga</h4>
                    <span>Rate</span>
                  </div>
                </div>
                <p>
                  Paga le tue rate comodamente dal tuo Pc o dal tuo telefono.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card mav">
            <div className="landing-feature-1--card__content mav">
              <img
                src={landingFeature1Mav}
                alt="mav/rav"
                style={{
                  marginTop: '69px',
                  width: '150px',
                }}
              />
              <div className="overlay">
                <div className="overlay--upper">
                  <img
                    src={icons.landingMavRav}
                    alt="mav/rav"
                    style={{
                      transform: 'scale(0.7) translateX(-18px)',
                    }}
                  />
                  <div>
                    <h4>Paga</h4>
                    <span>MAV/RAV</span>
                  </div>
                </div>
                <p>
                  Inserisci il codice MAV o RAV e paga con un semplice click il
                  tuo avviso.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Mav/Rav </span>
            <img src={images.landingMavRav} alt="logo" />
          </div>
        </div>
        <div className="landing-feature-1--card__container">
          <div className="landing-feature-1--card">
            <span>Paga con il telefono </span>
            <img src={images.landingPayByPhone} alt="logo" />
          </div>
        </div> */}
      </div>
    </div>
  );
});

export default FeatureCard1;
