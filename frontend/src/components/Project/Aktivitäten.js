import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AktivitätenBO from '../../api/AktivitätenBO';
import OneAPI from '../../api/OneAPI';
import { Dialog, Card, TextField, List, ListItem, Divider, } from '@mui/material';
import { Button, IconButton, DialogContent, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export class Aktivitäten extends Component {
    constructor(props) {
        super(props);
        let bz= "", da="", ca= "";
        // Init state
        this.state = {
            open: false,
            bezeichnung: bz,
            dauer: da,
            capacity: ca
        };
         // save this state for canceling
        this.baseState = this.state;
    }

    
    addAktivitäten = () => {
        let newAktivität = new AktivitätenBO(this.state.bezeichnung, this.state.dauer, this.state.capacity, this.props.project.id);
        OneAPI.getAPI().addAktivitäten(newAktivität).then(aktivität => {
          // Backend call sucessfull
          // reinit the dialogs state for a new empty project
          this.setState(this.baseState);
          this.props.handleClose(aktivität); // call the parent with the project object from backend
        }).catch(e =>
          this.setState({
            updatingInProgress: false,    // disable loading indicator 
            updatingError: e              // show error message
          })
        );
      // set loading to true
      this.setState({
        updatingInProgress: true,       // show loading indicator
        updatingError: null             // disable error message
      });
  }

  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  handleClose = () => {
    // Reset the state
    this.props.onClose();
  }

    render() {
        const {isOpen} = this.props;
        const {bezeichnung, dauer, capacity} = this.state;

        return (
              isOpen ?
               <Dialog open={isOpen} onClose={this.handleClose} maxWidth='md'>
                 <DialogTitle id='form-dialog-title'>Aktivität hinzufügen
            <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        <Card sx={{ minWidth: 275 }} variant="outlined" color="yellow">
        <List>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="bezeichnung"
            label="bezeichnung"
            value={bezeichnung}
            onChange={this.textFieldValueChange}
            /> 
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="capacity"
            label="Kapazität"
            value={capacity}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="dauer"
            label="dauer"
            value={dauer}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <Divider />
        </List>
        <button onClick={this.addAktivitäten}>Hinzufügen</button>
        </Card>
        </Dialog>:null
        );
    }
}

Aktivitäten.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  project: PropTypes.any
};

export default Aktivitäten;