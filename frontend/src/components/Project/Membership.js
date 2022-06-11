import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Button, Grid, IconButton, DialogContent, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions } from '@mui/material';
import './Aktivitäten.css'

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
        const {classes, m_vorname, m_nachname} = this.props;

        
    return (
      <Paper variant='outlined'>
        <div class="aktivitätenContent">
        <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of accounts</Typography>
        </Grid>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1'>{m_vorname}, {m_nachname}
                </Typography>
              </Grid>
        </Grid>
        </div>
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
  m_vorname: PropTypes.any,
  m_nachname: PropTypes.any
};

export default Membership;