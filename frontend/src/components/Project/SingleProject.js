import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {
  AppBar, Button, Card, CardActions, CardContent, Container, Dialog,
  IconButton, List, ListItem, TextField, Toolbar, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EreignisBO from '../../api/EreignisBO';
import OneAPI from '../../api/OneAPI';
import ProjectBO from '../../api/ProjectBO';
import LoadingProgress from '../Dialogs/LoadingProgress';
import Aktivitäten from './Aktivitäten';
import AktivitätenDetail from './AktivitätenDetail';
import MemberDetail from './MemberDetail';
import MemberList from './MemberList';
import './Project.css';

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
          customTitel: "",
          projektleiter: [],
          projektfarbe: "ProjectCard",
          projekttitel: "ProjektTitel",
          projektleiterIsUser: false,
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
          zeitintervall: null,
          zeitintervallEndeTime: null,
          zeitintervallStartTime: null,
          zeitintervallStart: null,
          zeitintervallEnde: null,
          zeitintervallbuchungIst: [],
          zeitintervallbuchungSoll: [],
          zeitdifferenzVerbraucht: 0
        };
    }
    
    getProjektleiterByProject = () => {
      OneAPI.getAPI().getProjektleiterByProject(this.props.project.id).then(projektleiter =>
        this.handleProjektleiterCheck(projektleiter)
        
        ).catch(e =>
          this.setState({ // Reset state with error from catch 
            projektleiter: null,
          })
        );
      // set loading to true
      this.setState({
      });
    }
  
    getZeitdifferenzForProject= () => {
      OneAPI.getAPI().getZeitdifferenzForProject(this.props.project.id).then(zeitdifferenz =>
          this.setState({
            zeitdifferenzVerbraucht: zeitdifferenz
          })
        ).catch(e =>
          this.setState({ // Reset state with error from catch 
           
          })
        );
      // set loading to true
      this.setState({
      });
    }

 

    handleProjektleiterCheck = (projektleiter) => {
      if(projektleiter[0].id === this.props.user){
        this.setState({
          projektfarbe:"ProjectCard-PL",
          projekttitel:"ProjektTitel-PL",
          projektleiterIsUser: true
        })
      }
      this.setState({
        projektleiter: projektleiter  
      })
    }

    updateProject = () => {
      this.updateLaufzeitEnde();
      this.updateLaufzeitStart();
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
        this.props.handleProjectDelete(this.props.project);  // call the parent with the deleted customer
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
        )
        this.setState({
          loadingInProgress: true,
          loadingError: null
        });
      };
      
        getProjektlaufzeit = () => {
          OneAPI.getAPI().getZeitintervall(this.props.project.laufzeit).then(zeitintervall =>{
            this.setState({
              zeitintervall: zeitintervall,
              loadingInProgress: false, // loading indicator 
              loadingError: null
            });
            this.getProjektlaufzeitAnfang(zeitintervall);
            this.getProjektlaufzeitEnde(zeitintervall);
            }).catch(e =>
              this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
              })
            )
            this.setState({
              loadingInProgress: true,
              loadingError: null
            });
          };
          

       getProjektlaufzeitAnfang = (zeitintervall) => {
         OneAPI.getAPI().getEreignis(zeitintervall[0].start).then(zeitintervallStart =>{
          this.setState({
             zeitintervallStartTime: zeitintervallStart[0].zeitpunkt,
             zeitintervallStart: zeitintervallStart[0],
             loadingInProgress: false, // loading indicator 
             loadingError: null
           })}).catch(e =>
             this.setState({ // Reset state with error from catch 
               loadingInProgress: false,
               loadingError: e
             })
           )
           this.setState({
            loadingInProgress: true,
            loadingError: null
          });
        };

           getProjektlaufzeitEnde = (zeitintervall) => {
            OneAPI.getAPI().getEreignis(zeitintervall[0].ende).then(zeitintervallEnde =>{
              this.setState({
                zeitintervallEndeTime: zeitintervallEnde[0].zeitpunkt,
                zeitintervallEnde: zeitintervallEnde[0],
                loadingInProgress: false, // loading indicator 
                loadingError: null
              })}).catch(e =>
                this.setState({ // Reset state with error from catch 
                  loadingInProgress: false,
                  loadingError: e
                })
              ) 
      // set loading to true
      this.setState({
        loadingInProgress: true,
        loadingError: null
      });
    };
    updateLaufzeitStart = () => {
      let zeitpunkt = this.state.zeitintervallStartTime 
      let updatedEreignis = Object.assign(new EreignisBO(), this.state.zeitintervallStart);
      updatedEreignis.setZeitpunkt(zeitpunkt)
      OneAPI.getAPI().updateEreignis(updatedEreignis).then(zeitintervallStart =>{
        const Start = this.transformProjektlaufzeitDate(zeitintervallStart[0])
        this.setState({
          zeitintervallStartTime: Start,
          zeitintervallStart: zeitintervallStart[0],
          loadingInProgress: false, // loading indicator 
          loadingError: null
        })}).catch(e =>
          this.setState({ // Reset state with error from catch 
            loadingInProgress: false,
            loadingError: e
          })
        )
        this.setState({
          loadingInProgress: true,
          loadingError: null
        });
        };
        updateLaufzeitEnde = () => {
          let zeitpunkt = this.state.zeitintervallEndeTime 
          let updatedEreignis = Object.assign(new EreignisBO(), this.state.zeitintervallEnde);
          updatedEreignis.setZeitpunkt(zeitpunkt)
          OneAPI.getAPI().updateEreignis(updatedEreignis).then(zeitintervallEnde =>{
            const Ende = this.transformProjektlaufzeitDate(zeitintervallEnde[0])
            this.setState({
              zeitintervallEndeTime: Ende,
              zeitintervallEnde: zeitintervallEnde[0],
              loadingInProgress: false, // loading indicator 
              loadingError: null
            })}).catch(e =>
              this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
              })
            ) 
// set loading to true
this.setState({
  loadingInProgress: true,
  loadingError: null
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
      const newAktivitätenList = this.state.aktivitäten.filter(aktivitätFromState => aktivitätFromState.getID() !== aktivität);
      this.setState({
        aktivitäten: newAktivitätenList
      });
    }

    memberDeleted = member => {
      const newMemberList = this.state.membership.filter(memberFromState => memberFromState.getID() !== member);
      this.setState({
        membership: newMemberList
      });
    }

    componentDidMount() {
    this.getProjektleiterByProject();
    this.loadAktivitäten();
    this.getMembersByProject();
    this.getProjektlaufzeit();
    this.getZeitdifferenzForProject();
    }

  render() {
    const {project, user} = this.props;
    const {openAkt, membership, aktivitäten, projektleiter, 
    isOpen, projektfarbe, loadingInProgress, openMember, projekttitel, projektName, laufZeit, auftragGeber, availableHours, 
    zeitintervall, zeitintervallEndeTime, zeitdifferenzVerbraucht, zeitintervallStartTime, zeitintervallbuchungIst, zeitintervallbuchungSoll, projektleiterIsUser} = this.state
    var IstZeitdifferenz = 0
    zeitintervallbuchungIst.map(buchung => IstZeitdifferenz += parseFloat(buchung.zeitdifferenz))
    var sollZeitdifferenz = 0
    zeitintervallbuchungSoll.map(buchung => sollZeitdifferenz += parseFloat(buchung.zeitdifferenz)) 
    return (
      <div class="ProjectCardWrapper"> 
      <Card onClick = {this.handleDialogOpen}class={projektfarbe}>
      <CardContent>
        <Typography variant="h5" class={projekttitel} component="div">
          {projektName}
        </Typography>
        <Typography variant="body2"class="ProjektContent" >
          Verfügbare Stunden: {zeitdifferenzVerbraucht ? zeitdifferenzVerbraucht.toFixed(0): 0}/{availableHours}h<br/>
          Projektleiter: {projektleiter[0] ?
           projektleiter[0].vorname : null}
        </Typography>
        <CardActions disableSpacing class="learnBtnWrapper">
        <button class="learnBtn">Mehr Infos</button>
        <Dialog
        fullScreen
        open={isOpen}
        onClose={this.updateProject}
      >
        <AppBar class="AppBar" sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick = {this.updateProject}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Projektdetails
            </Typography>
            {projektleiterIsUser ? 
            <>
            <IconButton
              edge="start"
              color="inherit"
              onClick = {this.updateProject}
            >
              <SaveIcon/>
            </IconButton> &nbsp;&nbsp;
            <IconButton
              edge="start"
              color="inherit"
              onClick = {this.deleteProject}
            >
              <DeleteIcon/>
            </IconButton></>:null}
          </Toolbar>
        </AppBar>
        <Container class="containerproject"> 
        <Typography class="überschriftakt" component="h2" variant="h6" color="black" gutterBottom>
        Projekt
        </Typography>
        <Card class="Projektdetails">
          {projektleiterIsUser ? 
          <List>
          <ListItem>
          <TextField
            type='text' required
            color="secondary"
            id="projektName"
            label="Projektname"
            value={projektName}
            onChange={this.textFieldValueChange}
            /> 
          </ListItem>
          <ListItem>
            <div class="projektzeit">
          <TextField
            type='text' required
            color="secondary"
            id="zeitintervallStartTime"
            label="Projektlaufzeit Von"
            value={zeitintervallStartTime}
            type="datetime-local"
            onChange={this.textFieldValueChange}
            InputLabelProps={{
              shrink: true,
            }}
            /> &nbsp;&nbsp;
            <TextField
            type='text' required
            color="secondary"
            id="zeitintervallEndeTime"
            label="Projektlaufzeit Bis"
            value={zeitintervallEndeTime}
            type="datetime-local"
            onChange={this.textFieldValueChange}
            InputLabelProps={{
              shrink: true,
            }}
            /></div>
          </ListItem>
          <ListItem>
          <TextField
            type='text' required
            color="secondary"
            id="auftragGeber"
            label="Auftraggeber"
            value={auftragGeber}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <ListItem>
          <TextField
            type='text' required
            color="secondary"
            id="availableHours"
            label="Verfügbare Stunden"
            value={availableHours}
            onChange={this.textFieldValueChange}
            /><Typography sx={{color:"red"}}>(-{zeitdifferenzVerbraucht.toFixed(1)}h)</Typography>
          </ListItem>
          <ListItem>
            <div class="addBtnFmly">
          <Button class="Akt_btn" onClick={this.openAkt}>
            Aktivitäten hinzufügen
            </Button>
            <Button onClick={this.openMember} class="Mit_btn">
            Mitarbeiter hinzufügen 
            </Button>
            </div>
          </ListItem>
          <Aktivitäten isOpen={openAkt} onClose={this.closeAkt} project={project} handleClose={this.addAktvität}>
            </Aktivitäten>
            <LoadingProgress show={loadingInProgress} />
        </List>
        :
        <List>
          <ListItem>
          <TextField
            disabled
            type='text' required
            color="secondary"
            id="projektName"
            label="Projektname"
            value={projektName}
            onChange={this.textFieldValueChange}
            /> 
          </ListItem>
          <ListItem>
    
          <TextField
            disabled
            type='text' required
            color="secondary"
            id="zeitintervallStartTime"
            label="Projektlaufzeit Von"
            value={zeitintervallStartTime}
            type="datetime-local"
            onChange={this.textFieldValueChange}
            InputLabelProps={{
              shrink: true,
            }}
            /> &nbsp;&nbsp;
            <TextField
            disabled
            type='text' required
            color="secondary"
            id="zeitintervallEndeTime"
            label="Projektlaufzeit Bis"
            value={zeitintervallEndeTime}
            type="datetime-local"
            onChange={this.textFieldValueChange}
            InputLabelProps={{
              shrink: true,
            }}
            />
          </ListItem>
          <ListItem>
          <TextField
            disabled
            type='text' required
            color="secondary"
            id="auftragGeber"
            label="Auftraggeber"
            value={auftragGeber}
            onChange={this.textFieldValueChange}
            />
          </ListItem>
          <ListItem>
          <TextField
            disabled
            type='text' required
            color="secondary"
            id="availableHours"
            label="Verfügbare Stunden"
            value={availableHours}
            onChange={this.textFieldValueChange}
            />
            
            <h1>{customTitel}</h1>



          </ListItem>
          <Aktivitäten isOpen={openAkt} onClose={this.closeAkt} project={project} handleClose={this.addAktvität}>
            </Aktivitäten>
            <LoadingProgress show={loadingInProgress} />
        </List>}
        </Card>
        </Container>
        <div>
        <Typography class="überschriftakt" component="h2" variant="h6" color="black" gutterBottom>
        Aktivitäten
        </Typography> 
          {
            aktivitäten.map(aktivität => <AktivitätenDetail key={aktivität.getID()} project={project} 
            aktivitätDeleted={this.aktivitätDeleted} aktivität={aktivität}  user={user} projektleiter={projektleiterIsUser ? true:false}/>)
          }
            <LoadingProgress show={loadingInProgress} />
        </div>
      <div >
      <Typography class="überschriftakt" component="h2" variant="h6" color="black" gutterBottom>
        Projektmitarbeiter
        </Typography> 
        {
            membership.map(member => <MemberDetail key={member.id}
            member={member} project={project.id} memberDeleted={this.memberDeleted} istStunden={IstZeitdifferenz} sollStunden={sollZeitdifferenz}
            projektleiter={projektleiterIsUser ? true:false}/> )
          }
          <MemberList isOpen={openMember} onClose={this.closeMember} user={user} project={project} handleNewMember={this.handleNewMember}>
          </MemberList>  
          <LoadingProgress show={loadingInProgress} />
      </div>
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