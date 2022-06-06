import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TextField, List, AppBar, ListItem, Divider, Dialog, 
IconButton, Toolbar, CardContent, CardActions, Card, Typography} from '@mui/material';
import './Project.css'
import CloseIcon from '@mui/icons-material/Close';
import OneAPI from '../../api/OneAPI';
import ProjectBO from '../../api/ProjectBO';
import Aktivitäten from './Aktivitäten';

export class SingleProject extends Component {
    constructor(props) {
        super(props);
        let pn = '', lz= '', ag= '', ah= '';
    if (props.project) {
      pn = props.project.getProjektname();
      lz = props.project.getLaufzeit();
      ag = props.project.getAuftraggeber();
      ah = props.project.getAvailablehours();
    }
        // Init state
        this.state = {
          isOpen: false,
          projektleiter: [],
          projektfarbe: "ProjectCard",
          projekttitel: "ProjektTitel",
          projektName: pn,
          laufZeit: lz,
          auftragGeber: ag,
          availableHours: ah

        };
    }

    getProjektleiterByProject = () => {
      OneAPI.getAPI().getProjektleiterByProject(this.props.project.id).then(projektleiter =>
        this.handleProjektfarbe(projektleiter)
        ).catch(e =>
          this.setState({ // Reset state with error from catch 
            projektleiter: null,
          })
        );
      // set loading to true
      this.setState({
      });
    }

    handleProjektfarbe = (projektleiter) => {
      if(projektleiter[0].id === this.props.user){
        this.setState({
          projektfarbe:"ProjectCard-PL",
          projekttitel:"ProjektTitel-PL"
        })
      }
      this.setState({
        projektleiter: projektleiter  
      })
    }

    updateProject = () => {
      // clone the original project, in case the backend call fails
      let updatedProject = Object.assign(new ProjectBO(), this.props.project);
      // set the new attributes from our dialog
      updatedProject.setProjektname(this.state.projektName);
      updatedProject.setLaufzeit(this.state.laufZeit);
      updatedProject.setAuftraggeber(this.state.auftragGeber);
      updatedProject.setAvailablehours(this.state.availableHours);
      OneAPI.getAPI().updateProject(updatedProject).then(project => {
        this.setState({
          updatingInProgress: false,              // disable loading indicator  
          updatingError: null,                     // no error message
          isOpen: false
        });
        // keep the new state as base state
        this.baseState.projektName = this.state.projektName;
        this.baseState.laufZeit = this.state.laufZeit;
        this.baseState.auftragGeber = this.state.auftragGeber;
        this.baseState.availableHours = this.state.availableHours;
        this.props.onClose(updatedProject);      // call the parent with the new customer
      }).catch(e =>
        this.setState({
          updatingInProgress: false,              // disable loading indicator 
          updatingError: e                        // show error message
        })
      );
  
      // set loading to true
      this.setState({
        updatingInProgress: true,                 // show loading indicator
        updatingError: null                       // disable error message
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

    handleDialogOpen = () => {
      this.setState({
        isOpen: true
      });
    }

    handleDialogClose = () => {
      this.setState({
        isOpen: false
      });
      console.log("Hier")
    }

    componentDidMount() {
    this.getProjektleiterByProject();
    }

  render() {
    const {project} = this.props;
    const {projektleiter, isOpen, projektfarbe, projekttitel, projektName, laufZeit, auftragGeber, availableHours} = this.state
    
    return (
      <div class="ProjectCardWrapper">
        <Card onClick = {this.handleDialogOpen}class={projektfarbe}>
      <CardContent>
        <Typography variant="h5" class={projekttitel} component="div">
          {projektName}
        </Typography>
        <Typography variant="body2"class="ProjektContent" >
          Verfügbare Stunden: {availableHours}h<br/>
          Deadline: 0{laufZeit}.04.2022<br/>
          Projektleiter: {projektleiter[0] ?
           projektleiter[0].vorname : null}
        </Typography>
        <CardActions disableSpacing class="learnBtnWrapper">
        <button class="learnBtn">Mehr Infos</button>
        <Dialog
        fullScreen
        open={isOpen}
      >
        <AppBar class="AppBar" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick = {this.handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Projektdetails
            </Typography>
            <button onClick={this.updateProject} class="saveBtn">Speichern</button>
          </Toolbar>
        </AppBar>
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
          <Aktivitäten/>
        </List>
      </Dialog>
      
      </CardActions>
      </CardContent>
      </Card>
      </div>
    )
  }
}

SingleProject.propTypes = {
    project: PropTypes.any,
    user: PropTypes.any,
    isOpen: PropTypes.any,
  }
export default SingleProject