import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DialogTitle, Dialog, Button, Tooltip, IconButton, Paper } from '@mui/material';
import './Project.css'
import './Aktivitäten.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import OneAPI from '../../api/OneAPI';
import ProjektarbeitDetails from './ProjektarbeitDetails';


class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null,
      openActivity: false,
      projektarbeiten: []
    };
  }

  openActivityDetails = () => {
    this.setState({
      openActivity: true
    });
  }

  closeActivityDetails = () => {
    this.setState({
      openActivity: false
    });
  }

  loadProjektarbeiten = () => {
    OneAPI.getAPI().getProjektarbeitByActivity(this.props.aktivität.id).then(projektarbeiten =>
      this.setState({
        projektarbeiten: projektarbeiten,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
}

  deleteAktivität = () => {
    OneAPI.getAPI().deleteAktivitäten(this.props.aktivität).then(() => {
      this.setState({  // Set new state when AccountBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(account);
      this.props.aktivitätDeleted(this.props.aktivität);  // call the parent with the deleted customer
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

  projektarbeitDeleted = projektarbeit => {
    const newProjektarbeitenList = this.state.projektarbeiten.filter(projektarbeitFromState => projektarbeitFromState.getID() !== projektarbeit);
    this.setState({
      projektarbeiten: newProjektarbeitenList
    });
  }

  /** Renders the component */
  render() {
    const {akt_dauer, akt_bezeichnung, akt_capacity } = this.props;
    const {openActivity, projektarbeiten} = this.state;

    return (
      <div>
      <Paper onClick={this.openActivityDetails} variant='outlined' className="paperaktivitäten">
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
       {openActivity?
      <Dialog open={openActivity} onClose={this.closeActivityDetails} maxWidth='md'>
        <DialogTitle id='form-dialog-title'>Aktivitätendetails
    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.closeActivityDetails}>
       <CloseIcon />
    </IconButton>
          { projektarbeiten?
            projektarbeiten.map(projektarbeit => <ProjektarbeitDetails key={projektarbeit.getID()} 
            projektarbeitDeleted={this.projektarbeitDeleted} projektarbeit={projektarbeit.getID()} proarb_bes={projektarbeit.getBeschreibung()}
            proarb_bez={projektarbeit.getBezeichnung()}/>)
      :null}
    </DialogTitle>
  </Dialog>:null}
  {console.log("Proarb1", projektarbeiten)}

  </div>
    );
  }
}

AktivitätenDetail.propTypes = {
  akt_dauer: PropTypes.any,
  akt_bezeichnung: PropTypes.any,
  onClose: PropTypes.any,
  akt_capacity: PropTypes.any,
  aktivität: PropTypes.any,
  aktivitätDeleted: PropTypes.any,
}

export default AktivitätenDetail;


