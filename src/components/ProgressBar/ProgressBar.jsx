import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { FlagRounded } from '@material-ui/icons';
import cn from 'classnames';
const ProgressBar = () => {
  const activeStep = 4;
  return (
    <div>
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
                <FlagRounded />
              </div>
            } /* StepIconComponent={FlagRounded} */
          />
        </Step>
      </Stepper>
    </div>
  );
};

export default ProgressBar;
