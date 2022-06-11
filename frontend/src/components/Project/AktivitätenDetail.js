import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Box, Grid, Typography, Paper } from '@material-ui/core';


class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {

    };
  }


  /** Renders the component */
  render() {
    const { classes, akt_dauer, akt_bezeichnung, akt_capacity } = this.props;

    return (
      <Paper variant='outlined' className={classes.root}>
        <div class="aktivitätenContent">
        <h6 className="title">
        {akt_bezeichnung}
        </h6> 
            <Typography>
              {akt_dauer} Tage übrig
            </Typography>
            <Typography>
             {akt_capacity} Arbeitsstunden übrig
            </Typography></div>
      </Paper>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    minWidth: '20rem',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: "rgba(172, 132, 217, 0.497)",
    borderRadius: "15px",
    margin: "1rem"

  },
  title: {
  marginRight: 50
}

});

/** PropTypes */
AktivitätenDetail.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The customerID to be rendered */
  akt_dauer: PropTypes.any,
  akt_bezeichnung: PropTypes.any,
  akt_capacity: PropTypes.any
  /** The accountID to be rendered */
}

export default withStyles(styles)(AktivitätenDetail);
