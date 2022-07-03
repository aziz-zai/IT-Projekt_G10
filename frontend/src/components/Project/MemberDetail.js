import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Button} from '@mui/material';
import './Membership.css'
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
          istStunden: 0,
          sollStunden: 0
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

    componentDidMount(){
      const userBuchungenIst = this.props.istBuchungen.filter(buchung => buchung.erstellt_für == this.props.member.id)
      const userBuchungenSoll = this.props.sollBuchungen.filter(buchung => buchung.erstellt_für == this.props.member.id)
      console.log('userbuch', userBuchungenIst, userBuchungenSoll)
      var ist = 0
      var soll = 0
      userBuchungenIst.map(buchung => ist += parseFloat(buchung.zeitdifferenz))
      userBuchungenSoll.map(buchung => soll += parseFloat(buchung.zeitdifferenz))
      this.setState({
        istStunden: ist,
        sollStunden: soll
      })
      console.log('istsoll',ist,soll)
    }

    render() {
        const {member, projektleiter} = this.props;
        const { istStunden, sollStunden} = this.state;
    return (
      <Paper variant='outlined' class="papermitarbeiter">
        <AccountCircleIcon/>      
        {member.vorname} {member.nachname} &nbsp;&nbsp; <strong>IST:{istStunden.toFixed(2)}h</strong> &nbsp; <strong>SOLL:{sollStunden.toFixed(2)}h</strong>
        
        {projektleiter ?<Button><DeleteIcon onClick={this.deleteMember} color="secondary"/>
          </Button>   :null}
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
  istStunden: PropTypes.any,
  sollStunden: PropTypes.any,
  projektleiter: PropTypes.any,
  istBuchungen: PropTypes.any,
  sollBuchungen: PropTypes.any,
};

export default Membership;