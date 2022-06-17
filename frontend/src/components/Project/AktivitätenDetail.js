import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TableCell, TableRow, TableBody, TableHead, Grid, Typography, Paper } from '@mui/material';
import './Project.css'
import './Aktivitäten.css'

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
      <Table  class="tablea" size="small" stickyHeader aria-label="sticky table">
        <TableHead>
            <TableRow>
                <TableCell>
                    <Typography component="h3" variant="h6" color="black">
                        Bezeichnung
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography component="h3" variant="h6" color="black">
                        Dauer
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography component="h3" variant="h6" color="black">
                        Kapazität
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>{akt_bezeichnung}</TableCell>
                <TableCell>{akt_dauer}</TableCell>
                <TableCell>{akt_capacity}</TableCell>
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

AktivitätenDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  /** The customerID to be rendered */
  akt_dauer: PropTypes.any,
  akt_bezeichnung: PropTypes.any,
  akt_capacity: PropTypes.any
}

export default AktivitätenDetail;


