import React, { useState, useEffect } from 'react';
import { registerFinalStep } from '../../../../assets/images';
import { Redirect } from 'react-router-dom';
import './style.scss';
const RegisterFinalStep = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => setRedirect(true), 3000);
  });
  return redirect ? (
    <Redirect to="/login" />
  ) : (
    <div className="final-step">
      <img src={registerFinalStep} alt="welcome" />
    </div>
  );
};

export default RegisterFinalStep;
