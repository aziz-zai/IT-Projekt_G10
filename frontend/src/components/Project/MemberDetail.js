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
          sollStunden: 0,
          zeitintervallbuchungIst: [],
          zeitintervallbuchungSoll: []
        };
         // save this state for canceling
        this.baseState = this.state;
    }

    deleteMember = () => {
      OneAPI.getAPI().deleteMembership(this.props.member.id, this.props.project).then(() => {
        this.setState({  // Set new state when MemberBO have been fetched
          deletingInProgress: false, // loading indicator 
          deletingError: null
        })
        // console.log(account);
        this.props.memberDeleted(this.props.member.id);  // call the parent with the deleted member
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

    getProjektarbeitbuchungByProjectIst = () => {
      OneAPI.getAPI().getProjektarbeitbuchungByProjectIst(this.props.member.id, this.props.project).then(zeitintervallbuchung =>{
        this.setState({
          zeitintervallbuchungIst: zeitintervallbuchung
        })
        var ist = 0
        zeitintervallbuchung.map(buchung => ist += parseFloat(buchung.zeitdifferenz))
        this.setState({
          istStunden: ist
        }) 
      }
        ).catch(e =>
          this.setState({ // Reset state with error from catch 
          })
        );
      // set loading to true
      this.setState({
      });
    }

    getProjektarbeitbuchungByProjectSoll = () => {
      OneAPI.getAPI().getProjektarbeitbuchungByProjectSoll(this.props.member.id, this.props.project).then(zeitintervallbuchung =>{
        this.setState({
          zeitintervallbuchungSoll: zeitintervallbuchung
        })
        var soll = 0
        zeitintervallbuchung.map(buchung => soll += parseFloat(buchung.zeitdifferenz))
        this.setState({
          sollStunden: soll
        }) 
      
      }
        ).catch(e =>
          this.setState({ // Reset state with error from catch 
          })
        );
      // set loading to true
      this.setState({
      });
    }

    componentDidMount(){
    this.getProjektarbeitbuchungByProjectIst();
    this.getProjektarbeitbuchungByProjectSoll();
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