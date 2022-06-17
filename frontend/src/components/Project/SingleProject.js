import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TextField, List, AppBar, ListItem, Dialog, 
IconButton, Button, Box, ButtonGroup, Container, Toolbar, CardContent, CardActions, Card, Typography} from '@mui/material';
import './Project.css'
import CloseIcon from '@mui/icons-material/Close';
import OneAPI from '../../api/OneAPI';
import ProjectBO from '../../api/ProjectBO';
import Aktivitäten from './Aktivitäten';
import AktivitätenDetail from './AktivitätenDetail';
import Projektarbeit from './Projektarbeit';
import LoadingProgress from '../Dialogs/LoadingProgress'
import MemberList from './MemberList';
import MemberDetail from './MemberDetail'

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
          availableHours: ah,
          openAkt: false,
          openProArb: false,
          openMember: false,
          membership: [],
          aktivitäten: [],
          loadingInProgress: false,
          deletingInProgress: false,
          loadingError: null,
          deletingError: null,
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

    deleteProject = () => {
      OneAPI.getAPI().deleteProject(this.props.project.getID()).then(() => {
        this.setState({  // Set new state when AccountBOs have been fetched
          deletingInProgress: false, // loading indicator 
          deletingError: null,
          isOpen: false
        })
        // console.log(account);
        this.props.onClose(this.props.project);  // call the parent with the deleted customer
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


    loadAktivitäten = () => {
      OneAPI.getAPI().getAktivitätenByProjectId(this.props.project.id).then(aktivitäten =>
        this.setState({
          aktivitäten: aktivitäten,
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

    getMembersByProject = () => {
      OneAPI.getAPI().getMembersByProject(this.props.project.id).then(membership =>
        this.setState({
          membership: membership,
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
    openAkt = () => {
      this.setState({
        openAkt: true
      });
    }

    closeAkt = () => {
      this.setState({
        openAkt: false
      });
    }

    openProArb = () => {
      this.setState({
        openProArb: true
      });
    }

    closeProArb = () => {
      this.setState({
        openProArb: false
      });
    }

    openMember = () => {
      this.setState({
        openMember: true
      });
    }

    closeMember = () => {
      this.setState({
        openMember: false
      });
    }

    handleDialogClose = () => {
      this.setState({
        isOpen: false
      });

    }


    handleNewMember = member => {
      // project is not null and therefore created
      if (member) {
        const newMembershipList = [...this.state.membership, member];
        this.setState({
          membership: newMembershipList,
        });
      } else {
        this.setState({
        });
      }
    }

    addAktvität = aktivität => {
      // project is not null and therefore created
      if (aktivität) {
        const newAktivitätenList = [...this.state.aktivitäten, aktivität];
        this.setState({
          aktivitäten: newAktivitätenList,
        });
      } else {
        this.setState({
        });
      }
    }

    aktivitätDeleted = aktivität => {
      const newAktivitätenList = this.state.aktivität.filter(aktivitätFromState => aktivitätFromState.getID() !== aktivität);
      this.setState({
        aktivität: newAktivitätenList
      });
    }

    memberDeleted = member => {
      const newMemberList = this.state.member.filter(memberFromState => memberFromState.getID() !== member);
      this.setState({
        member: newMemberList
      });
    }

    componentDidMount() {
    this.getProjektleiterByProject();
    this.loadAktivitäten();
    this.getMembersByProject();
    }

  render() {
    const {project, user, projektarbeit} = this.props;
    const {openAkt, membership, openProArb, handleDialogClose, aktivitäten, projektleiter, 
    isOpen, projektfarbe, loadingInProgress, openMember, projekttitel, projektName, laufZeit, auftragGeber, availableHours} = this.state
    
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
              onClick = {handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Projektdetails
            </Typography>
            <button onClick={this.updateProject} class="saveBtn">Speichern</button>
            <button onClick={this.deleteProject} class="saveBtn">Löschen</button>
          </Toolbar>
        </AppBar>
        <Container class="containerproject"> 
        <Typography class="überschriftakt" component="h2" variant="h6" color="black" gutterBottom>
        Projekt
        </Typography>
        <Card class="Projektdetails">
          <List>
          <ListItem>
          <TextField
            autoFocus type='text' required
            color="secondary"
            id="projektName"
            label="Projektname"
            value={projektName}
            onChange={this.textFieldValueChange}
            />  <Button>
            <Typography class="Mit_btn" onClick={this.openMember}>Mitarbeiter hinzufügen </Typography>
            </Button>
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            color="secondary"
            id="laufZeit"
            label="Projektlaufzeit"
            value={laufZeit}
            onChange={this.textFieldValueChange}
            /><Button>
            <Typography class="Akt_btn" onClick={this.openAkt}>Aktivitäten hinzufügen </Typography>
            </Button>
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            color="secondary"
            id="auftragGeber"
            label="Auftraggeber"
            value={auftragGeber}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <ListItem>
          <TextField
            autoFocus type='text' required
            color="secondary"
            id="availableHours"
            label="Verfügbare Stunden"
            value={availableHours}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <Aktivitäten isOpen={openAkt} onClose={this.closeAkt} project={project} handleClose={this.addAktvität}>
            </Aktivitäten>
            <LoadingProgress show={loadingInProgress} />
        </List>
        </Card>
        </Container>
        <Container>
        <div >
        <Typography class="überschriftakt" component="h2" variant="h6" color="black" gutterBottom>
        Aktivitäten
        </Typography> 
          {
            aktivitäten.map(aktivität => <AktivitätenDetail key={aktivität.getID()} 
            aktivitätDeleted={this.aktivitätDeleted} aktivität={aktivität.getID()} akt_bezeichnung={aktivität.getBezeichnung()} akt_dauer={aktivität.getDauer()} 
            akt_capacity={aktivität.getCapacity()}/>)
          }
            <LoadingProgress show={loadingInProgress} />
      </div>
      </Container>
      <Container>
      <div >
      <Typography class="überschriftakt" component="h2" variant="h6" color="black" gutterBottom>
        Projektmitarbeiter
        </Typography> 
        {
            membership.map(member => <MemberDetail key={member.id}
            member={member} project={project.id}/>)
          }
          <MemberList isOpen={openMember} onClose={this.closeMember} user={user} project={project} handleNewMember={this.handleNewMember}>
          </MemberList>  
          <LoadingProgress show={loadingInProgress} />
      </div>
      </Container>
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
    projektarbeit: PropTypes.any,
    handleProjectDelete: PropTypes.any
  }


export default SingleProject;