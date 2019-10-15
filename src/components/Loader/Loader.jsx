import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Loader.scss';
const Logo = () => {
  return (
    <div className="loader">
      <LinearProgress />
    </div>
  );
};

export default Logo;
