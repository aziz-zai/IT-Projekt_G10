import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TableCell, TableRow, TableBody, TableHead, Grid, Typography, Paper } from '@mui/material';
import './Project.css'
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class MemberDetails extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {

    };
  }

  /** Renders the component */
  render() {
    const {member} = this.props;

    return (
        <Paper variant='outlined'>
        {
          member ?
            <Typography>
                 <AccountCircleIcon/>
              {member.getVorname()} {member.getNachname()}
              <AddIcon/>
            </Typography>
            : null
        }        
      </Paper>
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
}

export default MemberDetails;


