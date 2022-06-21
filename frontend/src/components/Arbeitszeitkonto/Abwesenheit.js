import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export class Abwesenheit extends Component {
 // Init state
 constructor(props) {
    super(props);
this.state = {
};
}

handleFormClosed = () => {
    this.props.onClose();
}
  render() {
      const {show} = this.props;
      const {} = this.state;
    return (
        show ?
        <Dialog
        open={show}
        onClose={this.handleFormClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Abwesenheit erfassen
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Eine Arbeitsende Zeiterfassung muss immer zusammen mit einer Arbeitsbeginn Zeiterfassung erfasst werden. Bitte trage erst eine Arbeitsbeginn Zeit ein und erfasse diese.
          </DialogContentText><br/><br/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleFormClosed} autoFocus>
            Abschicken
          </Button>
        </DialogActions>
      </Dialog>:null
    )
  }
}

Abwesenheit.propTypes = {
   show: PropTypes.any,
   onClose: PropTypes.any,
  }
export default Abwesenheit