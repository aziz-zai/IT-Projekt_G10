import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Card,
  Container,
  Dialog,
  IconButton,
  List,
  ListItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { Component } from "react";
import EreignisBO from "../../api/EreignisBO";
import OneAPI from "../../api/OneAPI";
import ProjectBO from "../../api/ProjectBO";

export class CreateProject extends Component {
  constructor(props) {
    super(props);
    let pn = "",
      lz = null,
      ag = "",
      ah = "",
      bz = "",
      da = null,
      ca = null,
      pr = null;
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
      project: pr,
      projektlaufzeitAnfang: null,
      projektlaufzeitEnde: null,
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  addProject = (zeitintervall) => {
    let newProject = new ProjectBO(
      this.state.projektName,
      zeitintervall,
      this.state.auftragGeber,
      this.state.availableHours
    );
    OneAPI.getAPI()
      .addProject(newProject, this.props.user[0].id)
      .then((project) => {
        // Backend call sucessfull
        // reinit the dialogs state for a new empty project
        this.setState(this.baseState);
        this.props.handleClose(project); // call the parent with the project object from backend
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false, // disable loading indicator
          updatingError: e, // show error message
        })
      );
    // set loading to true
    this.setState({
      updatingInProgress: true, // show loading indicator
      updatingError: null, // disable error message
    });
  };

  function() {}

  function = () => {};

  //ProjektlaufzeitBeginn hinzuüfen dem Projekt
  addProjektlaufzeitAnfang = () => {
    let zeitpunkt = this.state.projektlaufzeitAnfang;
    let newProjektlaufzeitEreignis = new EreignisBO(zeitpunkt, "Projektanfang");
    OneAPI.getAPI()
      .addProjektlaufzeitBeginn(
        newProjektlaufzeitEreignis,
        this.props.user[0].id,
        this.state.projektName
      )
      .then((ereignis) => {
        // Backend call sucessfull
        // reinit the dialogs state for a new empty project
        // call the parent with the project object from backend

        this.addProjektlaufzeitEnde(ereignis);
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false, // disable loading indicator
          updatingError: e, // show error message
        })
      );
    // set loading to true
    this.setState({
      updatingInProgress: true, // show loading indicator
      updatingError: null, // disable error message
    });
  };

  //Projektlaufzeit Ende dem Projekt hinzuüfne
  addProjektlaufzeitEnde = (ereignis) => {
    let zeitpunkt = this.state.projektlaufzeitEnde;
    let newProjektlaufzeitEreignis = new EreignisBO(zeitpunkt, "Projektende");
    OneAPI.getAPI()
      .addProjektlaufzeitEnde(
        newProjektlaufzeitEreignis,
        this.props.user[0].id,
        ereignis.id,
        this.state.projektName
      )
      .then((zeitintervall) => {
        // Backend call sucessfull
        // reinit the dialogs state for a new empty project
        // call the parent with the project object from backend
        this.setState({
          laufZeit: zeitintervall.id,
        });
        this.addProject(zeitintervall.id);
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false, // disable loading indicator
          updatingError: e, // show error message
        })
      );
    // set loading to true
    this.setState({
      updatingInProgress: true, // show loading indicator
      updatingError: null, // disable error message
    });
  };

  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + "ValidationFailed"]: error,
      [event.target.id + "Edited"]: true,
    });
  };

  render() {
    const { isOpen } = this.props;
    const {
      projektName,
      laufZeit,
      auftragGeber,
      availableHours,
      projektlaufzeitAnfang,
      projektlaufzeitEnde,
    } = this.state;

    return (
      <div>
        <Dialog fullScreen open={isOpen}>
          <AppBar class="AppBar" sx={{ position: "relative" }}>
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
              <button onClick={this.addProjektlaufzeitAnfang} class="saveBtn">
                {" "}
                Speichern{" "}
              </button>
            </Toolbar>
          </AppBar>
          <Container class="containerproject">
            <Typography
              class="überschriftakt"
              component="h2"
              variant="h6"
              color="black"
              gutterBottom
            >
              Projekt
            </Typography>
            <Card class="Projektdetails">
              <List>
                <ListItem>
                  <TextField
                    autoFocus
                    type="text"
                    required
                    color="secondary"
                    id="projektName"
                    label="Projektname"
                    value={projektName}
                    onChange={this.textFieldValueChange}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    autoFocus
                    type="text"
                    required
                    color="secondary"
                    id="projektlaufzeitAnfang"
                    label="Projektlaufzeit Von"
                    value={projektlaufzeitAnfang}
                    type="datetime-local"
                    onChange={this.textFieldValueChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />{" "}
                  &nbsp;&nbsp;
                  <TextField
                    autoFocus
                    type="text"
                    required
                    color="secondary"
                    id="projektlaufzeitEnde"
                    label="Projektlaufzeit Bis"
                    value={projektlaufzeitEnde}
                    type="datetime-local"
                    onChange={this.textFieldValueChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    autoFocus
                    type="text"
                    required
                    color="secondary"
                    id="auftragGeber"
                    label="Auftraggeber"
                    value={auftragGeber}
                    onChange={this.textFieldValueChange}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    autoFocus
                    type="text"
                    required
                    color="secondary"
                    id="availableHours"
                    label="Verfügbare Stunden"
                    value={availableHours}
                    onChange={this.textFieldValueChange}
                  />
                </ListItem>
              </List>
            </Card>
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
};
export default CreateProject;
