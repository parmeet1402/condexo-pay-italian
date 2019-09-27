import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
const ProgressBar = props => {
  const { activeStep } = props;
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel />
      </Step>
      <Step>
        <StepLabel />
      </Step>
      <Step>
        <StepLabel />
      </Step>
      <Step>
        <StepLabel />
      </Step>
      <Step>
        <StepLabel
          icon={
            <div
              className={cn('progress-bar__flag', {
                'progress-bar__flag_active': activeStep === 4
              })}
            >
              <FontAwesomeIcon icon={faFlagCheckered} />
            </div>
          }
        />
      </Step>
    </Stepper>
  );
};

export default ProgressBar;
