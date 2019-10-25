import React, { useState, useEffect } from 'react';
import { Page, PageContent } from '../layout';
import { Logo } from '../../components/Logo';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Navbar from '../../components/Navbar';
import { Hero, FeatureCard1, FeatureCard2 } from '../../components/landing/';

import './style.scss';

const Landing = () => {
  return (
    <Page>
      <PageContent className="landing-page">
        <div>
          <div className="landing-content__container">
            <Navbar />
            <Hero />
            <FeatureCard1 />
            <FeatureCard2 />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Landing;
