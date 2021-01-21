/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { isClient, isApiSupported } from '../utils';

const errorMessage =
  'matchMedia is not supported, this could happen both because window.matchMedia is not supported by' +
  " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

const useMediaQuery = (query) => {
  if (!isClient || !isApiSupported('matchMedia')) {
    console.warn(errorMessage);
    return null;
  }

  const [isVerified, setIsVerified] = useState(
    !!window.matchMedia(query).matches
  );

  useEffect(() => {
    // window.matchMedia returns a media query list
    const mediaQueryList = window.matchMedia(query);

    // Called when there is a change in mediaQueryList
    const documentChangeHandler = () => setIsVerified(!!mediaQueryList.matches);

    // Add change listener to mediaQueryList
    mediaQueryList.addListener(documentChangeHandler);

    // explicity call document change handler once for setting inital state
    documentChangeHandler();
    return () => {
      // remove the listeners
      mediaQueryList.removeListener(documentChangeHandler);
    };
  }, [query]);

  return isVerified;
};

export default useMediaQuery;
