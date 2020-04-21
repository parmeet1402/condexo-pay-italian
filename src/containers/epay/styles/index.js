import React from 'react';
import { withStyles, Button as MuiButton } from '@material-ui/core';

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

const Button = ({ extraPadding, children, viewMore, ...rest }) => {
  const styles = {};
  if (!!extraPadding) styles.padding = '8px 32px';
  if (!!viewMore) {
    styles.backgroundColor = '#1a315b';
    styles.color = '#fff';
  }

  return (
    <MuiButton {...rest} style={styles}>
      {children}
    </MuiButton>
  );
};

export const ViewButton = withStyles(styles)(Button);
