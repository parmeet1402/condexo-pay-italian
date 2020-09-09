import React from 'react';
import './DiagonalNavbar.scss';
const DiagonalNavbar = ({ history }) => {
  const handleLogoClick = () => {
    console.log(history);
    history.push('/');
  };
  return (
    <div className="diagonal-navbar">
      <svg
        width="299px"
        height="47px"
        viewBox="0 0 302 47"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      >
        <title>CondexoPay</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g
          id="CONDEXO-PAY"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          font-family="Poppins-Bold, Poppins"
          font-size="48"
          font-weight="bold"
          letter-spacing="-0.4393843"
        >
          <g id="login-ita" transform="translate(-42.000000, -57.000000)">
            <g id="Group-5">
              <text id="CondexoPay" style={{ 'mix-blend-mode': 'lighten' }}>
                <tspan x="41" y="93" fill="#FFFFFF">
                  Condexo
                </tspan>
                <tspan
                  x="259.34831"
                  y="93"
                  font-family="ArialRoundedMTBold, Arial Rounded MT Bold"
                  font-weight="normal"
                  fill="#27DDCB"
                >
                  Pay
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
      {/* <img src={logoForNavbar} alt="logo" /> */}
    </div>
  );
};

export default DiagonalNavbar;
