import React from 'react';
const Footer = ({ currentPath }) => {
  return (
    <footer style={{ marginTop: '-28px' }}>
      {(currentPath === '/login' ||
        currentPath === '/registrazione' ||
        currentPath === '/ricariche') && (
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
