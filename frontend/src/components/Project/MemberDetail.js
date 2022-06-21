import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Button} from '@mui/material';
import './Aktivitäten.css'
import './Project.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OneAPI from '../../api/OneAPI';


export class Membership extends Component {
    constructor(props) {
        super(props);
      
        // Init state
        this.state = {
          deletingInProgress: false,
          deletingError: null,
        };
         // save this state for canceling
        this.baseState = this.state;
    }

    deleteMember = () => {
      OneAPI.getAPI().deleteMembership(this.props.member.id, this.props.project).then(() => {
        this.setState({  // Set new state when AccountBOs have been fetched
          deletingInProgress: false, // loading indicator 
          deletingError: null
        })
        // console.log(account);
        this.props.memberDeleted(this.props.member.id);  // call the parent with the deleted customer
      }).catch(e =>
        this.setState({ // Reset state with error from catch 
          deletingInProgress: false,
          deletingError: e
        })
      );
      // set loading to true
      this.setState({
        deletingInProgress: true,
        deletingError: null
      });
    }

    render() {
        const {member} = this.props;
        
    return (
      <Paper variant='outlined' class="papermitarbeiter">
        <AccountCircleIcon/>      
        {member.vorname} {member.nachname}
        <Button><DeleteIcon onClick={this.deleteMember} color="secondary"/>
          </Button>    
      </Paper>
    );
  }
}


Membership.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  classes: PropTypes.any,
  project: PropTypes.any,
  member: PropTypes.any,
  memberDeleted: PropTypes.any,
};

export default Membership;