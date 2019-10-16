import React, { useState, useEffect } from 'react';
import Button from '../../../../components/common/Button';
import { Redirect } from 'react-router-dom';
import './style.scss';
const ForgotPasswordFinalStep = () => {
  /* const [redirect,setRedirect] = useState(false);
  useEffect(()=> {
    setTimeout(()=>setRedirect(true), 3000)
  }) */
  return (
    /* redirect?<Redirect to="/login"/>: */ <div className="final-step">
      <h1>Congratulations!</h1>
      <h1>You've successfully reset your password!</h1>
      <Button
        color="primary"
        size="large"
        type="submit"
        onClick={() => <Redirect to="/login" />}
      >
        Home
      </Button>
    </div>
  );
};

export default ForgotPasswordFinalStep;
