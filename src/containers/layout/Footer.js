import React from 'react';
const Footer = ({ currentPath }) => {
  return (
    <footer>
      {(currentPath === '/login' || currentPath === '/registrazione') && (
        <>
          Condexo © 2020 CondexoPay. All rights reserved.&nbsp;
          <a
            href={`${window.location.origin}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </a>
        </>
      )}
    </footer>
  );
};

export default Footer;
