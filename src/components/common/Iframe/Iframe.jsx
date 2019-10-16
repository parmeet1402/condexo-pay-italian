import React from 'react';
import './Iframe.scss';
const Iframe = ({ title, src, height, width, ...restProps }) => {
  return (
    <>
      <iframe
        src={src}
        title={title}
        height={height}
        width={width}
        {...restProps}
      />
    </>
  );
};

export default Iframe;
