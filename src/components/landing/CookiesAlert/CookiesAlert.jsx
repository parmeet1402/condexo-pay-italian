import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useCookie from '../../../hooks/useCookie';
import './CookiesAlert.scss';
const CookiesAlert = () => {
  console.log(document.cookie);
  const setCookie = () => {
    setCookieState('accepted-cookies');
  };
  const [cookieState, setCookieState] = useCookie();

  return (
    <>
      {cookieState.includes('accepted-cookies') ? null : (
        <div className="cookies-alert">
          <p>
            Questo sito usa cookies, anche di terze parti. Proseguendo la
            navigazione accedendo a altre aree del sito o interagendo con
            elementi del sito manifesti il tuo consenso all'uso dei cookies.
          </p>
          <FontAwesomeIcon icon={faTimes} onClick={setCookie} />
        </div>
      )}
    </>
  );
};

export default CookiesAlert;
