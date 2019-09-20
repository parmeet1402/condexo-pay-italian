import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button as MaterialButton } from '@material-ui/core';
import './Button.scss';

const styles = {
  label: {
    fontSize: '14px',
    textTransform: 'none'
  },
  textPrimary: {
    backgroundColor: '#1a315b',
    color: 'white',
    '&:hover': {
      backgroundColor: '#28ddcb'
    }
  },
  sizeLarge: {
    padding: '10px 50px',
    textTransform: 'lowercase'
  },
  outlined: {
    border: '1px solid #cbcbcb',
    color: '#808080',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#cbcbcb'
    }
  }
};
const Button = props => {
  return <MaterialButton {...props}>{props.children}</MaterialButton>;
};

export default withStyles(styles)(Button);
