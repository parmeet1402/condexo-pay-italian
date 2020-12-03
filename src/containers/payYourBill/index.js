import React, { useState, useEffect } from 'react';
import UIActions from '../../redux/UIRedux';
import { connect } from 'react-redux';

import { Page, PageContent } from '../layout';
import history from '../../utils/history';
import { ProgressBar } from '../../components/ProgressBar';

import Header from './Header.jsx';
import Bollettino from './Bollettino';

import './PayYourBill.scss';

const PayYourBill = ({ showNavbar }) => {
  console.log('PAY YOUR BILL---- OUTSIDE ALL FUNCTIONS');
  const [activeVariant, setActiveVariant] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    console.log(history);
  }, [history]);
  useEffect(() => {
    showNavbar();
  }, [showNavbar]);

  useEffect(() => {
    setActiveVariant(history.location.pathname.substring(1));
  }, []);

  const exitFlow = () => {
    history.push('/dashboard');
  };

  return (
    <Page>
      <PageContent className="pay-your-bill__page">
        <Header exitFlow={exitFlow} />
        <ProgressBar totalSteps={4} activeStep={activeStep} />

        {activeVariant === 'bollettini' && (
          <Bollettino activeStep={activeStep} setActiveStep={setActiveStep} />
        )}
      </PageContent>
    </Page>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayYourBill);
