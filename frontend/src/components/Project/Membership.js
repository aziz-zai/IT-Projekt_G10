import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, TableHead, TableCell, TableRow, Table, TableBody, Button, Grid, IconButton, 
DialogContent, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions } from '@mui/material';
import './Aktivitäten.css'
import './Project.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export class Membership extends Component {
    constructor(props) {
        super(props);
      
        // Init state
        this.state = {

        };
         // save this state for canceling
        this.baseState = this.state;
    }

    render() {
        const {member} = this.props;

        
    return (
     
      <Paper variant='outlined' class="papermitarbeiter">
        <AccountCircleIcon/>      
        {member.vorname} {member.nachname}
        <Button><DeleteIcon color="secondary"/>
          </Button>
      </Paper>
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
  }
});

Membership.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  classes: PropTypes.any,
  project: PropTypes.any,
  member: PropTypes.any
};

export default Membership;