import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const FlashMessage = props => {
  const message = props.message;
  const { hideFlashMessage, variant } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={true}
      autoHideDuration={12500}
      onClose={hideFlashMessage}
    >
      <SnackbarContent
        style={{
          backgroundColor:
            variant === 'success' ? 'rgb(47, 112, 50)' : 'rgb(145, 31, 31)'
        }}
        aria-describedby="client-snackbar"
        message={<span id="client-snackbar">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={hideFlashMessage}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default FlashMessage;
