import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DialogTitle, Dialog, Button, Tooltip, IconButton, Paper, ButtonGroup } from '@mui/material';
import './Project.css'
import './Aktivitäten.css'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
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
import CreateProjektarbeit from './CreateProjektarbeit';
import AktivitätenBO from '../../api/AktivitätenBO';


class AktivitätenDetail extends Component {

  constructor(props) {
    super(props);
    let bz = "", da = "", cap = ""
    if(props.aktivität){
      bz= props.aktivität.bezeichnung;
      da= props.aktivität.dauer;
      cap= props.aktivität.capacity;
}
    // Init state
    this.state = {
      deletingInProgress: false,
      deletingError: null,
      openActivity: false,
      projektarbeiten: [],
      startFilter: null,
      endFilter: null,
      istBuchung: true,
      openCreateProjektarbeit: false,
      openUpdateAktivität: false,
      bezeichnung: bz,
      dauer: da,
      kapazität: cap,
      zeitintervallbuchungSoll: [],
      zeitintervallbuchungIst: [],
      tageVerbraucht: 0
    };
  }
 
  getZeitintervallbuchungIst = () => {
    OneAPI.getAPI().getProjektarbeitbuchungIst(0,null, null, this.props.aktivität.id).then(buchungen =>
      this.setState({
        zeitintervallbuchungIst: buchungen,
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({
    });
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

  openCreateProjektarbeit= () => {
    this.setState({
      openCreateProjektarbeit: true
    });
  }

  closeCreateProjektarbeit= () => {
    this.setState({
      openCreateProjektarbeit: false
    });
  }

  //Aktivität updaten
  updateAktivität = () => {
    let newAktivität = new AktivitätenBO(this.state.bezeichnung,this.state.dauer, this.state.kapazität,this.props.project.id)
    newAktivität.setTimestamp(this.props.aktivität.timestamp)
    OneAPI.getAPI().updateAktivitäten(newAktivität, this.props.aktivität.id).then(aktivität =>
      this.setState({
        openUpdateAktivität: false
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
}

//Aktvität deleten
  deleteAktivität = () => {
    OneAPI.getAPI().deleteAktivitäten(this.props.aktivität.id).then(() => {
      this.setState({  // Set new state when AccountBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(account);
      this.props.aktivitätDeleted(this.props.aktivität.id);  // call the parent with the deleted customer
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

  openUpdateForm = () => {
    this.setState({
      openUpdateAktivität: true
    })
  }
  closeUpdateForm = () => {
    this.setState({
      openUpdateAktivität: false
    })
  }

  
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  getTageVerbraucht = () => {
    const timestamp = new Date(this.props.aktivität.timestamp)
    const now = new Date()
    const Days = Math.round((now-timestamp) /(1000 * 3600 * 24))
    this.setState({
     tageVerbraucht: Days
    })

  }

  componentDidMount(){
    this.getZeitintervallbuchungIst();
    this.getTageVerbraucht()
  }

  /** Renders the component */
  render() {
    const { user, aktivität, projektleiter, project} = this.props;
    const {openActivity, endFilter, startFilter, istBuchung, openCreateProjektarbeit, openUpdateAktivität,
    bezeichnung, dauer, kapazität, zeitintervallbuchungIst, tageVerbraucht} = this.state;
    var IstZeitdifferenz = 0
    zeitintervallbuchungIst.map(buchung => IstZeitdifferenz += parseFloat(buchung.zeitdifferenz)) 
    return (
      <div>
      <Paper onClick={this.openActivityDetails} variant='outlined' class="paperaktivitäten">
        <div><strong>{bezeichnung}</strong></div>
        <div><strong>{tageVerbraucht}/{dauer}</strong> Tage</div>
        <div><strong>{IstZeitdifferenz.toFixed(0)}/{kapazität}</strong>h</div>
        {projektleiter ? 
        <Button><DeleteIcon onClick={this.deleteAktivität} color="secondary"/>
          </Button>:null}
      </Paper>
       {openActivity?
      <Dialog open={openActivity} onClose={this.closeActivityDetails} maxWidth='md' fullWidth sx={{overflow:"scroll", maxHeight: "100vh"}}>
        <DialogTitle id='form-dialog-title'>{bezeichnung}
        <Button onClick={this.openUpdateForm}>
            <EditIcon />
            Aktivität bearbeiten
          </Button>
    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.closeActivityDetails}>
       <CloseIcon />
    </IconButton></DialogTitle>
      <List>
        <ListItem>
          <Tooltip title="Projektarbeit hinzufügen">
          <Button size="large" onClick={this.openCreateProjektarbeit}startIcon={<AddBoxIcon/>}>Projektarbeit hinzufügen</Button>
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
           <Projektarbeitbuchung istBuchung={istBuchung} startFilter={startFilter} endFilter={endFilter} user={user} activityid={aktivität.id}/>
         </div>
       </div>
      </ListItem>
      </List>
  </Dialog>:null}
  <CreateProjektarbeit handleClose={this.closeCreateProjektarbeit} show={openCreateProjektarbeit} project={project} user={user} activity={aktivität.id}/>
  {openUpdateAktivität ?
               <Dialog open={openUpdateAktivität} onClose={this.closeUpdateForm} maxWidth='md'>
                 <DialogTitle id='form-dialog-title'>Aktivität bearbeiten
            <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.closeUpdateForm}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        <Card sx={{ minWidth: 275 }} variant="outlined" color="yellow">
        <List>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="bezeichnung"
            label="Bezeichnung"
            value={bezeichnung}
            onChange={this.textFieldValueChange}
            /> 
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="kapazität"
            label="Kapazität"
            value={kapazität}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            id="dauer"
            label="Dauer"
            value={dauer}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
        </List>
        <button class="HinzufügenBtn" onClick={this.updateAktivität}>Speichern</button>
        </Card>
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
  project: PropTypes.any,
}

export default AktivitätenDetail;


