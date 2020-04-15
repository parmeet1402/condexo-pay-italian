import React from 'react';
import {
  withStyles,
  Button as MuiButton,
  Tooltip as MuiToolTip
} from '@material-ui/core';

const styles = {
  outlined: {
    border: '1px solid #1a315b',
    color: '#1a315b',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#1a315b'
    }
  }
};

const Button = ({ extraPadding, children, ...rest }) => {
  const styles = {};
  if (!!extraPadding) styles.padding = '8px 32px';

  return (
    <MuiButton {...rest} style={styles}>
      {children}
    </MuiButton>
  );
};

const tooltipStyles = {
  tooltip: {
    backgroundColor: '#ffffff',
    color: '#a4abb5',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16)',
    fontSize: 11,
    border: '1px solid #979797'
  }
};

export const Tooltip = withStyles(tooltipStyles)(MuiToolTip);

export const ViewButton = withStyles(styles)(Button);
