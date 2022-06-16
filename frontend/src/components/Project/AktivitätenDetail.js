import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, Button, Tooltip, IconButton, Typography, Paper } from '@mui/material';
import './Project.css'
import './Aktivitäten.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import OneAPI from '../../api/OneAPI';


class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null,

    };
  }

  deleteAktivität = () => {
    OneAPI.getAPI().deleteAktivitäten(this.props.aktivität).then(() => {
      this.setState({  // Set new state when AccountBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(account);
      this.props.onClose(this.props.aktivität);  // call the parent with the deleted customer
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

  /** Renders the component */
  render() {
    const {akt_dauer, akt_bezeichnung, akt_capacity } = this.props;

    return (
      <Paper variant='outlined' class="paperaktivitäten">
        <div><strong>{akt_bezeichnung}</strong></div>
        <div><strong>{akt_dauer}</strong> Tage übrig</div>
        <div><strong>{akt_capacity}</strong>h übrig</div>
        <Tooltip title="Projektarbeit hinzufügen">
          <IconButton>
            <AddBoxIcon class="ProArbBtn" onClick={this.openProArb}/>
          </IconButton>
        </Tooltip>
        <Button><DeleteIcon onClick={this.deleteAktivität} color="secondary"/>
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
  onClose: PropTypes.any,
  akt_capacity: PropTypes.any,
  aktivität: PropTypes.any
}

export default AktivitätenDetail;


