import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, TableHead, TableCell, TableRow, Table, TableBody, Button, Grid, IconButton, 
DialogContent, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions } from '@mui/material';
import './Aktivitäten.css'
import './Project.css'

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
      <Table class="tablem" size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
              <Typography component="h3" variant="h6" color="black">
                  Vorname
                  </Typography>
              </TableCell>
              <TableCell>
              <Typography component="h3" variant="h6" color="black">
                  Nachname
                  </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            <TableRow>
              <TableCell>{member.vorname}</TableCell>
              <TableCell>{member.nachname}</TableCell>
              {console.log("member", member)}
            </TableRow>
            </TableBody>
      </Table>
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