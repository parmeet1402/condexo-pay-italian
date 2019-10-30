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
  textSecondary: {
    backgroundColor: '#28ddcb',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1a315b'
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
  const styles = typeof props.style !== 'undefined' ? { ...props.style } : {};
  if (!!props.rounded) styles.borderRadius = '34px';
  if (!!props.textColor) styles.textColor = props.textColor;
  if (!!props.borderColor) styles.borderColor = props.borderColor;
  return (
    <MaterialButton {...props} style={styles}>
      {props.children}
    </MaterialButton>
  );
};

export default withStyles(styles)(Button);
