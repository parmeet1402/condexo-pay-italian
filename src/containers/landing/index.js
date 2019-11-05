import React, { useRef, useEffect } from 'react';
import { Page, PageContent } from '../layout';
import { connect } from 'react-redux';
import UIActions, { UISelectors } from '../../redux/UIRedux';
/* import { Logo } from '../../components/Logo';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import Navbar from '../../components/Navbar'; */
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

const Landing = props => {
  useEffect(() => {
    props.showNavbar();
  }, []);

  return (
    <Page>
      <PageContent className="landing-page">
        <div>
          <div className="landing-content__container">
            <div className="landing-content">
              <Hero />
              <FeatureCard1 ref={props.featureCard1Ref} />
              <FeatureCard2 />
              <FeatureCard3 />
              <FeatureCard4 ref={props.featureCard4Ref} />
              <StayInTouch />
            </div>
            <Footer />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};
const mapDispatchToProps = dispatch => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
  addRef: (name, ref) => dispatch(UIActions.addRef(name, ref))
});
export default connect(
  null,
  mapDispatchToProps
)(Landing);
