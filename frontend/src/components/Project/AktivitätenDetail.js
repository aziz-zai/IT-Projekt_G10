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
import { Card, List, ListItem } from '@material-ui/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Projektarbeitbuchung from './Projektarbeitbuchung';


class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null,
      openActivity: false,
      projektarbeiten: [],
      startFilter: null,
      endFilter: null,
      istBuchung: true,
    };
  }

  openActivityDetails = () => {
    if(this.props.projektleiter){
    this.setState({
      openActivity: true
    });}
    else{
      this.setState({
        openActivity: false
      });
    }
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

  handleEreignisbuchung = () => {
    this.setState({
      ereignisbuchungSelected: true,
      zeitintervallbuchungSelected: false,
    })
  }
  handleZeitintervallbuchung = () => {
    this.setState({
      ereignisbuchungSelected: false,
      zeitintervallbuchungSelected: true,
    })
  }
  
  dateFilterChanged = (event) => {
  if(event.target.value != ""){
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  else{
    this.setState({
      [event.target.id]: null,
    });
  }
  }
  
  handleIstSelected = () => {
      this.setState({
      istBuchung: true,
    });
  
  }
  
  handleSollSelected = () => {
    this.setState({
    istBuchung: false,
  });
  
  }

  /** Renders the component */
  render() {
    const {akt_dauer, akt_bezeichnung, akt_capacity, user, aktivität, projektleiter} = this.props;
    const {openActivity, projektarbeiten, endFilter, startFilter, istBuchung, zeitintervallbuchungSelected, ereignisbuchungSelected} = this.state;

    return (
      <div>
      <Paper onClick={this.openActivityDetails} variant='outlined' class="paperaktivitäten">
        <div><strong>{akt_bezeichnung}</strong></div>
        <div><strong>{akt_dauer}</strong> Tage übrig</div>
        <div><strong>{akt_capacity}</strong>h übrig</div>
        {projektleiter ? 
        <Button><DeleteIcon onClick={this.deleteAktivität} color="secondary"/>
          </Button>:null}
      </Paper>
       {openActivity?
      <Dialog open={openActivity} onClose={this.closeActivityDetails} maxWidth='md' fullWidth sx={{overflow:"scroll", maxHeight: "100vh"}}>
        <DialogTitle id='form-dialog-title'>Aktivitätendetails
    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.closeActivityDetails}>
       <CloseIcon />
    </IconButton></DialogTitle>
      <List>
        <ListItem>
          <Tooltip title="Projektarbeit hinzufügen">
          <Button size="large" startIcon={<AddBoxIcon/>}/>
        </Tooltip>
        </ListItem>

        <ListItem>
        <div class="buchungContainer">
         <div class="buchungHeader">
           <div class="buchungFilter"><FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={istBuchung}
      >
        <FormControlLabel onClick={this.handleIstSelected}value={true} control={<Radio />} label="Ist Buchungen" />
        <FormControlLabel onClick={this.handleSollSelected}value={false} control={<Radio />} label="Soll Buchungen" />
      </RadioGroup>
      <TextField
        id="startFilter"
        label="Von"
        type="datetime-local"
        value={startFilter}
        onChange={this.dateFilterChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> <TextField
      id="endFilter"
      label="Bis"
      type="datetime-local"
      value={endFilter}
      onChange={this.dateFilterChanged}
      sx={{width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    /> 
    </FormControl></div>
         </div>
         <div class="buchungSelection">
           <div class="selectionItem1"><button class="selectionBtn" onClick={this.handleZeitintervallbuchung}>Zeitintervallbuchungen</button></div>
         </div>
         <div class="buchungen">
           <Projektarbeitbuchung istBuchung={istBuchung} startFilter={startFilter} endFilter={endFilter} user={user} activityid={aktivität}/>
         </div>
       </div>
      </ListItem>
      </List>
  </Dialog>:null}

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
  user: PropTypes.any,
  projektleiter: PropTypes.any,
}

export default AktivitätenDetail;


