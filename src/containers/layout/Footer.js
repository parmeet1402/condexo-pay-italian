import React from 'react';
const Footer = ({ currentPath }) => {
  return (
    <footer>
      {(currentPath === '/login' || currentPath === '/registrazione') && (
        <>
          Condexo © 2020 CondexoPay. All rights reserved.&nbsp;
          <a
            href="http://condexopay.api.demos.classicinformatics.com/files/uploads/Privacy_condexo_pay.pdf"
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
