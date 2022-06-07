import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Success(success) {

  return (
      <Snackbar open={success} autoHideDuration={6000} >
        <Alert  severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
  );
}
