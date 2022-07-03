import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Textfield, ListItem, TableHead, TableCell, TableRow, Table, TableBody, Button, Grid, IconButton, 
DialogContent, Dialog, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions } from '@mui/material';
import './Aktivitäten.css'
import './Project.css'
import OneAPI from '../../api/OneAPI';
import MembershipBO from '../../api/MembershipBO'
import CloseIcon from '@mui/icons-material/Close';
import PotentialMember from './PotentialMember'

export class MembershipList extends Component {
    constructor(props) {
        super(props);
      
        // Init state
        this.state = {
          users: []
        };
         // save this state for canceling
        this.baseState = this.state;
    }  

  getUsers = () => {
    OneAPI.getAPI().getPotentialMembers(this.props.user, this.props.project.getID()).then(userBOs =>
      this.setState({  // Set new state when user have been fetched
        users: userBOs,
        loadingInProgress: false, // loading indicator 
        loadingUserError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          users: [],
          loadingInProgress: false,
          loadingUserError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingUserError: null
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

  handleAddMember = member => {
    // Reset the state
    this.props.handleNewMember(member);
  }

  componentDidMount() {
    this.getUsers();
    }

  render() {
      const {isOpen, project} = this.props;
      const {users} = this.state;
      return (
            isOpen ?
             <Dialog open={isOpen} onClose={this.handleClose} maxWidth='md'>
               <DialogTitle id='form-dialog-title'>Mitarbeiter hinzufügen
          <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
          {
            users.map(user => <PotentialMember member={user} project={project} handleClose={this.handleAddMember}
            ></PotentialMember>)
          }
        </DialogTitle>
      </Dialog>:null
      );
    }
  }

MembershipList.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  classes: PropTypes.any,
  user: PropTypes.any,
  project: PropTypes.any,
  handleNewMember: PropTypes.any
};

export default MembershipList;