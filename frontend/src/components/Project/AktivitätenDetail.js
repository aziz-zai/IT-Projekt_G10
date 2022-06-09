import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Box, Grid, Typography, Paper } from '@material-ui/core';
import { OneAPI } from '../../api';
import { yellow } from '@mui/material/colors';

class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
        aktivitäten: []

    };
  }


  /** Renders the component */
  render() {
    const { classes, akt_dauer, akt_bezeichnung, akt_capacity } = this.props;
    const {aktivitäten} = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>
        <Typography variant='h6'>
          Aktivität
        </Typography>
        <Typography className={classes.accountEntry}>
          ID: {akt_dauer}
        </Typography>
        {
          aktivitäten ?
            <Typography>
              Aktivität: {akt_bezeichnung} {akt_dauer} {akt_capacity}
            </Typography>
            : null
        }
      </Paper>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  accountEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  AktEntry: {
  display: "flex",
  flexDirection: "column"
}

});

/** PropTypes */
AktivitätenDetail.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The customerID to be rendered */
  akt_dauer: PropTypes.string.isRequired,
  akt_bezeichnung: PropTypes.string.isRequired,
  akt_capacity: PropTypes.string.isRequired
  /** The accountID to be rendered */
}

export default withStyles(styles)(AktivitätenDetail);
