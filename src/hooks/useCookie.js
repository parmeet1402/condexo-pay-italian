import React, { useEffect, useState } from 'react';
const useCookie = () => {
  const [cookieState, setCookieState] = useState(document.cookie);

  useEffect(() => {
    if (cookieState !== document.cookie) {
      document.cookie = cookieState;
    }
  }, [cookieState]);

  return [cookieState, setCookieState];
};
export default useCookie;
