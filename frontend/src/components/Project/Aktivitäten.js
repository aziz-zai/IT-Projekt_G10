import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AktivitätenBO from '../../api/AktivitätenBO';
import OneAPI from '../../api/OneAPI';
import { Dialog, Card, TextField, List, ListItem, Divider, } from '@mui/material';

export class Aktivitäten extends Component {
    constructor(props) {
        super(props);
        let bz= "", da="", ca= "", pr= "";
    if (props.aktivität) {
        bz = props.aktivität.getBezeichnung();
        da = props.aktivität.getDauer();
        ca = props.aktivität.getCapacity();
        pr = props.aktivität.getProject();
    }
        // Init state
        this.state = {
            open: false,
            bezeichnung: bz,
            dauer: da,
            capacity: ca,
            project: pr
        };
         // save this state for canceling
        this.baseState = this.state;
    }

    
    addAktivitäten = () => {
        let newAktivität = new AktivitätenBO(this.state.bezeichnung, this.state.dauer, this.state.capacity, this.state.project);
        OneAPI.getAPI().addAktivitäten(newAktivität, this.props.member[0].id).then(aktivität => {
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

  
    render() {
        const {isOpen} = this.props;
        const {bezeichnung, dauer, capacity} = this.state;

        return (
            <div>
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
        </Card>
            </div>
        );
    }
}

Aktivitäten.propTypes = {
    member: PropTypes.any

};

export default Aktivitäten;