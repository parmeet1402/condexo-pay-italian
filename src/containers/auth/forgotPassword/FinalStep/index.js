import React, { useState, useEffect } from 'react';
import Button from '../../../../components/common/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import './style.scss';
const ForgotPasswordFinalStep = () => {
  /* const [redirect,setRedirect] = useState(false);
  useEffect(()=> {
    setTimeout(()=>setRedirect(true), 3000)
  }) */
  const LightBlueButton = withStyles({
    root: {
      color: '#fff',
      backgroundColor: '#4a90e2',
      border: '1px solid',
      borderColor: '#4a90e2',
      borderRadius: 4,
      fontWeight: 'normal',

      '&:hover': {
        backgroundColor: '#fff',
        borderColor: '#4a90e2',
        boxShadow: 'none',
        color: '#4a90e2',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#fff',
        borderColor: '#4a90e2',
      },
      '&:focus': {},
    },
  })(Button);

  return (
    <div className="final-step">
      <h1>La nuova password</h1>
      <h1>è stata registrata correttamente!</h1>
      <Link to="/login">
        <LightBlueButton color="primary" size="large" type="submit">
          Torna alla home
        </LightBlueButton>
      </Link>
    </div>
  );
};

export default ForgotPasswordFinalStep;
