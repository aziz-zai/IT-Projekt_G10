import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, Button, TableCell, TableRow, TableBody, TableHead, Grid, Typography, Paper } from '@mui/material';
import './Project.css'
import './Aktivitäten.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';


class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {

    };
  }

  /** Renders the component */
  render() {
    const {akt_dauer, akt_bezeichnung, akt_capacity } = this.props;

    return (
      <Paper variant='outlined' class="papermitarbeiter">
        <div><strong>{akt_bezeichnung}</strong></div>
        <div><strong>{akt_dauer}</strong> Tage übrig</div>
        <div><strong>{akt_capacity}</strong>h übrig</div>
        <AddBoxIcon class="ProArbBtn" onClick={this.openProArb}/>
        <Button><DeleteIcon color="secondary"/>
          </Button>
      </Paper>
    );
  }
}

const styles = theme => ({
    root: {
      width: '100%',
    }
  });

AktivitätenDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  /** The customerID to be rendered */
  akt_dauer: PropTypes.any,
  akt_bezeichnung: PropTypes.any,
  akt_capacity: PropTypes.any
}

export default AktivitätenDetail;


