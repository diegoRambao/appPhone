import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function SimpleSnackbar({open, message, setOpenSnack}) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnack(false);
    };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}