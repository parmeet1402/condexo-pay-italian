import React from 'react';
import Button from '../../../../components/common/Button';

import './style.scss';
const ForgotPasswordFinalStep = () => {
  return (
    <div className="final-step">
      <h1>Congratulations!</h1>
      <h1>You've successfully reset your password!</h1>
      <Button
        color="primary"
        size="large"
        type="submit"
        onClick={() => alert('Will be directed to dashboard')}
      >
        Home
      </Button>
    </div>
  );
};

export default ForgotPasswordFinalStep;
