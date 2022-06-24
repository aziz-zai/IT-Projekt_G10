import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjektarbeitBO from '../../api/ProjektarbeitBO';
import OneAPI from '../../api/OneAPI';
import { Dialog, Card, TextField, List, ListItem, Divider, } from '@mui/material';
import { Button, IconButton, DialogContent, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Aktivitäten.css'

export class Projektarbeit extends Component {
    constructor(props) {
        super(props);
        let bz="", st="", en="";
        // Init state
        this.state = {
            open: false,
            bezeichnung: bz,
            start: st,
            ende: en
        };
         // save this state for canceling
        this.baseState = this.state;
    }

    addKommenSoll = () => {
        let newKommenSoll = new ProjektarbeitBO(this.state.bezeichnung, this.state.start, this.state.ende);
        OneAPI.getAPI().addKommenSoll(newKommenSoll, this.props.erstellt_fuer, this.props.erstellt_von, this.props.projektarbeit).then(kommensoll => {
          // Backend call sucessfull
          // reinit the dialogs state for a new empty project
          this.setState(this.baseState);
          this.props.handleClose(kommensoll); // call the parent with the project object from backend
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

    addGehenSoll = () => {
        let newGehenSoll = new ProjektarbeitBO(this.state.bezeichnung, this.state.start, this.state.ende);
        OneAPI.getAPI().addGehenSoll(newGehenSoll, this.props.projektarbeitid, this.props.erstellt_von, this.props.erstellt_fuer).then(gehensoll => {
          // Backend call sucessfull
          // reinit the dialogs state for a new empty project
          this.setState(this.baseState);
          this.props.handleClose(gehensoll); // call the parent with the project object from backend
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
        const {bezeichnung, start, ende} = this.state;

        return (
              isOpen ?
               <Dialog open={isOpen} onClose={this.handleClose} maxWidth='md'>
                 <DialogTitle id='form-dialog-title'>Projektarbeit hinzufügen
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
            label="Bezeichnung"
            value={bezeichnung}
            onChange={this.textFieldValueChange}
            /> 
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="start"
            label="Start"
            value={start}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="ende"
            label="Ende"
            value={ende}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <Divider />
        </List>
        <button class="HinzufügenBtn" onClick={this.addKommenSoll}>Hinzufügen</button>
        </Card>
        </Dialog>:null
        );
    }
}

Projektarbeit.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  project: PropTypes.any,
  projektarbeit: PropTypes.any,
  erstellt_fuer: PropTypes.any,
  erstellt_von: PropTypes.any
};

export default Projektarbeit;