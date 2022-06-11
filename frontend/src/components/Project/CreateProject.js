import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OneAPI from '../../api/OneAPI'
import ProjectBO from '../../api/ProjectBO';
import { Container, TextField, Dialog, ListItem, List, Divider, AppBar, 
Toolbar, Grid, Card, IconButton, Typography, Slide} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AktivitätenBO from '../../api/AktivitätenBO';


export class CreateProject extends Component {
    constructor(props) {
        super(props);
        let pn = '', lz = null, ag = '', ah = '', 
        bz='', da=null, ca=null, pr=null;
    if (props.project) {
      pn = props.project.getProjektname();
      lz = props.project.getLaufzeit();
      ag = props.project.getAuftraggeber();
      ah = props.project.getAvailablehours();
      bz = props.aktivität.getBezeichnung();
      da = props.aktivität.getDauer();
      ca = props.aktivität.getCapacity();
      pr = props.aktivität.getProject();
    }
      // Init the state
    this.state = {
      open: false,
      projektName: pn,
      projektNameValidationFailed: false,
      projektNameEdited: false,
      laufZeit: lz,
      laufZeitValidationFailed: false,
      laufZeitEdited: false,
      auftragGeber: ag,
      auftragGeberValidationFailed: false,
      auftragGeberEdited: false,
      availableHours: ah,
      availableHoursValidationFailed: false,
      availableHoursEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
      bezeichnung: bz,
      dauer: da,
      capacity: ca,
      project: pr
    };
    // save this state for canceling
    this.baseState = this.state;
  }

    addProject = () => {
      let newProject = new ProjectBO(this.state.projektName, this.state.laufZeit, this.state.auftragGeber, this.state.availableHours);
      OneAPI.getAPI().addProject(newProject, this.props.user[0].id).then(project => {
        // Backend call sucessfull
        // reinit the dialogs state for a new empty project
        this.setState(this.baseState);
        this.props.handleClose(project); // call the parent with the project object from backend
      }).catch(e =>
        this.setState({
          updatingInProgress: false,    // disable loading indicator 
          updatingError: e              // show error message
        })
      );
    // set loading to true
    this.setState({
      updatingInProgress: true,       // show loading indicator
      updatingError: null             // disable error message
    });
  }



textFieldValueChange = (event) => {
  const value = event.target.value;

  let error = false;
  if (value.trim().length === 0) {
    error = true;
  }

  this.setState({
    [event.target.id]: event.target.value,
    [event.target.id + 'ValidationFailed']: error,
    [event.target.id + 'Edited']: true
  });
}

  render() {
      const {isOpen, project, user} = this.props;
      const {projektName, projektNameEdited, projektNameValidationFailed, laufZeit, laufZeitEdited, laufZeitValidationFailed,
      auftragGeber, auftragGeberEdited, auftragGeberValidationFailed, availableHours, availableHoursEdited, availableHoursValidationFailed,
      bezeichnung, dauer, capacity} = this.state;

    return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
      >
        <AppBar class="AppBar" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Projekt anlegen
            </Typography>
            <button onClick={this.addProject} class="saveBtn"> Speichern </button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{marginTop:'10px'}} justify-content="space-between"> 
        <Grid container spacing={2} justify="center" color="primary"> 
          <Card sx={{ minWidth: 275 }} variant="outlined" color="yellow">
            <Typography sx={{
          mx: 'auto',
          width: 200,
          p: 1,
          m: 1,
          border: '1px solid',
          borderColor: "black",
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}> 
            Projektdetails eintragen
            </Typography>
              <List>
                <ListItem>
                <TextField
                  autoFocus type='text' required
                  id="projektName"
                  label="Projektname"
                  value={projektName}
                  onChange={this.textFieldValueChange}
                  /> 
                </ListItem>
                <ListItem>
                <TextField
                  autoFocus type='text' required
                  id="laufZeit"
                  label="Projektlaufzeit"
                  value={laufZeit}
                  onChange={this.textFieldValueChange}
                  />
                </ListItem>
                <ListItem>
                <TextField
                  autoFocus type='text' required
                  id="auftragGeber"
                  label="Auftraggeber"
                  value={auftragGeber}
                  onChange={this.textFieldValueChange}
                  />
                </ListItem>
                <ListItem>
                <TextField
                  autoFocus type='text' required
                  id="availableHours"
                  label="Verfügbare Stunden"
                  value={availableHours}
                  onChange={this.textFieldValueChange}
                  />
                </ListItem>
                <Divider />
              </List>
          </Card>
        </Grid>
      </Container>
    </Dialog>
    </div>
  );
}
}

CreateProject.propTypes = {
  isOpen: PropTypes.any,
  handleClose: PropTypes.any,
  user: PropTypes.any,
}
export default CreateProject
