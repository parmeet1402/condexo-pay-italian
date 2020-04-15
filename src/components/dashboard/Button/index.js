import { Button as MuiButton, withStyles } from '@material-ui/core';

const styles = {
  outlined: {
    border: '1px solid #1a315b',
    color: '#1a315b',
    padding: '8px 32px',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#1a315b'
    }
  },
  contained: {
    backgroundColor: '#4a90e2',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#28ddcb'
    }
  }
};

export const Button = withStyles(styles)(MuiButton);
