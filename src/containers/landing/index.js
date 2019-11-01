import React, { useRef } from 'react';
import { Page, PageContent } from '../layout';
import { Logo } from '../../components/Logo';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Navbar from '../../components/Navbar';
import {
  Hero,
  FeatureCard1,
  FeatureCard2,
  FeatureCard3,
  FeatureCard4,
  StayInTouch,
  Footer
} from '../../components/landing/';

import './style.scss';

const Landing = () => {
  const featureCard4Ref = useRef(null);
  const featureCard1Ref = useRef(null);
  return (
    <Page>
      <PageContent className="landing-page">
        <div>
          <div className="landing-content__container">
            <Navbar
              featureCard4Ref={featureCard4Ref}
              featureCard1Ref={featureCard1Ref}
            />
            <div className="landing-content">
              <Hero />
              <FeatureCard1 ref={featureCard1Ref} />
              <FeatureCard2 />
              <FeatureCard3 />
              <FeatureCard4 ref={featureCard4Ref} />
              <StayInTouch />
            </div>
            <Footer />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Landing;
