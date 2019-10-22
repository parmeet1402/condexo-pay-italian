import React, { useState, useEffect } from 'react';
import Button from '../../../../components/common/Button';
import { Link } from 'react-router-dom';
import './style.scss';
const ForgotPasswordFinalStep = () => {
  /* const [redirect,setRedirect] = useState(false);
  useEffect(()=> {
    setTimeout(()=>setRedirect(true), 3000)
  }) */
  return (
    <div className="final-step">
      <h1>La nuova password</h1>
      <h1>è stata registrata correttamente!</h1>
      <Link to="/login">
        <Button color="primary" size="large" type="submit">
          Torna alla home
        </Button>
      </Link>
    </div>
  );
};

export default ForgotPasswordFinalStep;
