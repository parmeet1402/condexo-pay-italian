import React from 'react';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import history from '../../../utils/history';
import './style.scss';

const Bollettino = ({ activeStep, setActiveStep }) => {
  const goStepAhead = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };
  const goStepBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };
  const exitFlow = () => {
    history.push('/dashboard');
  };
  return (
    <div className="pay-your-bill__content bollettino">
      {activeStep === 0 && <StepOne goStepAhead={goStepAhead} />}
      {activeStep === 1 && (
        <StepTwo goStepAhead={goStepAhead} goStepBack={goStepBack} />
      )}
      {activeStep === 2 && (
        <StepThree goStepAhead={goStepAhead} goStepBack={goStepBack} />
      )}
      {activeStep === 3 && <StepFour />}
    </div>
  );
};

export default Bollettino;
