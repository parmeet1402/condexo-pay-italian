import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import cn from 'classnames';

import './Loader.scss';
const Logo = ({ belowNavbar }) => {
  return (
    <div className={cn('loader', { 'loader--belowNavbar': belowNavbar })}>
      <LinearProgress />
    </div>
  );
};

export default Logo;
