import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import OneAPI from '../../api/OneAPI';
import MembershipBO from '../../api/MembershipBO';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './Membership.css'

class MemberDetails extends Component {

  constructor(props) {
    super(props);
    // Init state
    this.state = {
      membership: [],
      success: false,
      newMember: null
    };
  }

  addMember = () => {
    let newMember = new MembershipBO(this.props.member.getID(), this.props.project.getID(), false );
    OneAPI.getAPI().addMembership(newMember).then(membership => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty project
      this.setState({
        success: true,
        newMember: membership
      });
      this.props.handleClose(membership); // call the parent with the project object from backend
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


  /** Renders the component */
  render() {
    const {member} = this.props;
    const {success} = this.state;

    return (
      <div>
      <Paper variant='outlined' sx={{ width: '100%', padding: 1, marginTop: 1, display:"flex", alignItems:"center", flexDirection:"row" }}>
<>
      <AccountBoxIcon/> &nbsp;&nbsp;
{
  member ?
  <>
    <Typography variant="button">
      {member.getVorname()} {member.getNachname()}
    </Typography>
    {success ?
    <CheckCircleOutlineIcon sx={{marginLeft:"auto", color:"green"}}/>
     :<AddCircleOutlineIcon sx={{marginLeft:"auto"}}onClick={this.addMember}/>}
    </>
    : null
} {console.log('add', this.state.test)}
</>
</Paper>
    </div>
    );
  }
}

const styles = theme => ({
    root: {
      width: '100%',
    }
  });

  MemberDetails.propTypes = {
  /** The customerID to be rendered */
    member: PropTypes.any,
    project: PropTypes.any
}

export default MemberDetails;


