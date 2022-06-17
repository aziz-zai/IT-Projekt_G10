import React, { Component } from 'react';
import './Zeiterfassung.css'
import PropTypes from 'prop-types'
import ProjectSelection from '../components/Zeiterfassung/ProjectSelection';
import AktivitätenSelection from '../components/Zeiterfassung/AktivitätenSelection';
import ProjektarbeitenSelection from '../components/Zeiterfassung/ProjektarbeitenSelection';
import Kommen from '../components/Zeiterfassung/Kommen';
import Gehen from '../components/Zeiterfassung/Gehen';
import Pause from '../components/Zeiterfassung/Pause';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import OneAPI from '../api/OneAPI'
import KommenBO from '../api/KommenBO'
import EreignisBO from '../api/EreignisBO';
import ProjektarbeitBO from '../api/ProjektarbeitBO'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';





export class Zeiterfassung extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      project: null,
      aktivität: null,
      projektarbeit: null,
      projectSelected: false,
      aktivitätSelected: false,
      kommenClicked: false,
      stunden: 0,
      minuten: 0,
      sekunden: 0,
      kommen: new KommenBO(),
      kommenDate: 0,
      projektarbeitIst: null,
      gehen: null,
      pausenBeginn: null,
      pausenEnde: null,
      kommenAlert: false,
      kommenErrorAlert: false,
      gehenAlert: false,
      h: 0,
      m: 0,
      s: 0,
      Eh: 0,
      Em: 0, 
      Es: 0, 
      PBh: 0,
      PBm: 0,
      PBs: 0, 
      PEh: 0,
      PEm: 0,
      PEs: 0,
      zeitDifHours: 0,
      zeitDifMinutes: 0,
      zeitDifSeconds: 0,
      projektArbeitBeschreibung: "",
    };
  }

  componentDidMount() {
  
  }

  /** gets the balance for this account */

  addKommenIst = () => {
    OneAPI.getAPI().addKommenIst(this.props.user[0].id, this.state.projektarbeit).then(kommen =>
      this.setState({
        kommen: kommen,
        kommenAlert: true
      }), this.handleKommenClicked
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          kommen: null,
        })
      );
    // set loading to true
    this.setState({
    });
  }


  addGehenIst = () => {
    OneAPI.getAPI().addGehenIst(this.state.kommen.id, this.props.user[0].id, this.state.aktivität).then(gehen => {
      this.setState({
        gehen: gehen,
        gehenAlert: true
      });
      return gehen
      }).then(gehen =>{
        const kommenTime = new Date(this.state.kommen.zeitpunkt);
        const gehenTime = new Date(gehen.zeitpunkt);
        const pausenBeginnTime = this.state.pausenBeginn ? new Date(this.state.pausenBeginn.zeitpunkt): 0;
        const pausenEndeTime = this.state.pausenEnde ? new Date(this.state.pausenEnde.zeitpunkt): 0;
        const arbeitsZeitSeconds = Math.floor(((gehenTime - kommenTime)-(pausenEndeTime - pausenBeginnTime))/1000)
        const minutes = Math.floor(arbeitsZeitSeconds/60);
        const hours = Math.floor(minutes/60);
        const days = Math.floor(hours/24);
              
        const difHours = hours-(days*24);
        const difMinutes = minutes-(days*24*60)-(hours*60);
        const difSeconds = arbeitsZeitSeconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
      
        this.setState({
              h: kommenTime.getHours(), 
              m: kommenTime.getMinutes(), 
              s: kommenTime.getSeconds(), 
              Eh: gehenTime.getHours(), 
              Em: gehenTime.getMinutes(), 
              Es: gehenTime.getSeconds(), 
              PBh: this.state.pausenBeginn ? pausenBeginnTime.getHours() : 0, 
              PBm: this.state.pausenBeginn ? pausenBeginnTime.getMinutes() : 0, 
              PBs: this.state.pausenBeginn ? pausenBeginnTime.getSeconds() : 0, 
              PEh: this.state.pausenEnde ? pausenEndeTime.getHours() : 0, 
              PEm: this.state.pausenEnde ? pausenEndeTime.getMinutes() : 0, 
              PEs: this.state.pausenEnde ? pausenEndeTime.getSeconds() : 0,
              zeitDifSeconds: difSeconds,
              zeitDifHours: difHours,
              zeitDifMinutes: difMinutes,
            })})
            .catch(e =>
              this.setState({ // Reset state with error from catch 
                gehen: null,
              })
            ); 
    // set loading to true
    this.setState({
    });
  }
  addPausenBeginn = () => {
    var currentDate = new Date()
    var dateFormat = currentDate.toLocaleString("nl-NL")
    let newPausenBeginn = new EreignisBO(dateFormat, "Pause")
    OneAPI.getAPI().addPausenBeginn(newPausenBeginn, this.props.user[0].id).then(pausenBeginn =>
      this.setState({
        pausenBeginn: pausenBeginn,
      }),
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          pausenBeginn: null,
        })
      );
    // set loading to true
    this.setState({
    });
  }

  
  getProjektarbeitByStart = () => {
    OneAPI.getAPI().getProjektarbeitByStart(this.state.kommen.id).then(projektarbeitIst =>
      this.setState({
        projektarbeitIst: projektarbeitIst,
      }),
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          projektarbeitIst: null,
        })
      );
    // set loading to true
    this.setState({
    });
  }
  
  updateProjektarbeit = () => {
    let newProjektarbeitIst = new ProjektarbeitBO()
    newProjektarbeitIst.setActivity(this.state.aktivität)
    newProjektarbeitIst.setBeschreibung(this.state.projektArbeitBeschreibung)
    newProjektarbeitIst.setBezeichnung(this.state.projektarbeitIst[0].bezeichnung)
    newProjektarbeitIst.setEnde(this.state.gehen.id)
    newProjektarbeitIst.setStart(this.state.kommen.id)
    OneAPI.getAPI().updateProjektarbeit(newProjektarbeitIst, this.state.projektarbeitIst[0].id).then(projektarbeitIst =>{
    this.setState({
      project: null,
      aktivität: null,
      projektarbeit: null,
      projectSelected: false,
      aktivitätSelected: false,
      kommenClicked: false,
      stunden: 0,
      minuten: 0,
      sekunden: 0,
      kommen: new KommenBO(),
      kommenDate: 0,
      projektarbeitIst: null,
      gehen: null,
      pausenBeginn: null,
      pausenEnde: null,
      kommenAlert: false,
      kommenErrorAlert: false,
      gehenAlert: false,
      h: 0,
      m: 0,
      s: 0,
      Eh: 0,
      Em: 0, 
      Es: 0, 
      PBh: 0,
      PBm: 0,
      PBs: 0, 
      PEh: 0,
      PEm: 0,
      PEs: 0,
      zeitDifHours: 0,
      zeitDifMinutes: 0,
      zeitDifSeconds: 0,
      projektArbeitBeschreibung: "",
    })
    }
     ).catch(e =>
      console.log('projektarbeitIstfail', newProjektarbeitIst)
      );
    // set loading to true
    this.setState({
    });
  }
  addPausenEnde = () => {
    var currentDate = new Date()
    var dateFormat = currentDate.toLocaleString("nl-NL")
    let newPausenEnde = new EreignisBO(dateFormat, "Pause")
    OneAPI.getAPI().addPausenEnde(newPausenEnde, this.state.pausenBeginn.id, this.props.user[0].id).then(pausenEnde =>
      this.setState({
        pausenEnde: pausenEnde,
      }),
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          pausenEnde: null,
        })
      );
    // set loading to true
    this.setState({
    });
  }

  handleProjectSelection = (project) => {
    this.setState({
      project: project,
      projectSelected: true
    })
	}

  handleAktivitätSelection = (aktivität) => {
    this.setState({
      aktivität: aktivität,
      aktivitätSelected: true

    })
	}

  handleProjektarbeitSelection = (projektarbeit) => {
    this.setState({
      projektarbeit: projektarbeit,
    });
	}

  handleAktSelectionCLose = () => {
    this.setState({
      projectSelected: false,
      aktivitätSelected: false
    });
	}

  handlePrArSelectionCLose = () => {
    this.setState({
      aktivitätSelected: false
    })
  }

  handleKommenClicked = () => {

    if(this.state.projektarbeit){
    this.addKommenIst();
  }
    else{
      this.setState({
        kommenErrorAlert: true,
    });
    }
    this.setState({
        kommenClicked: true,
    });

    const update = () => { 
      
      if(this.state.kommen.zeitpunkt){
      var day1 = new Date(this.state.kommen.zeitpunkt); 
      var day2 = new Date();
      var seconds = Math.floor((day2 - (day1))/1000);
      var minutes = Math.floor(seconds/60);
      var hours = Math.floor(minutes/60);
      var days = Math.floor(hours/24);
      
      hours = hours-(days*24);
      minutes = minutes-(days*24*60)-(hours*60);
      seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

      this.setState({
          stunden: hours,
          minuten: minutes,
          sekunden: seconds
      })
      }
  }
  update();
  this.interval = setInterval(()=> {
      update();
  }, 1000);

}
handleGehenClicked = () => {
  this.addGehenIst();
  this.getProjektarbeitByStart();
  clearInterval(this.interval);

}

handleKommenAlertCLose = () => {
  this.setState({
    kommenAlert: false
  })
}

handleGehenAlertCLose = () => {
  this.updateProjektarbeit()
}

handleKommenErrorAlertCLose = () => {
  this.setState({
    kommenErrorAlert: false
  })
}

textFieldValueChange = (event) => {
  this.setState({
    projektArbeitBeschreibung: event.target.value,
  });
}

  render() {
    const {user} = this.props;
    const {projectSelected, aktivitätSelected, project, aktivität, kommenClicked, stunden, minuten, sekunden, kommen, 
      projektarbeitIst, gehen,pausenBeginn, pausenEnde, kommenAlert, kommenErrorAlert, gehenAlert,
    h, m, s, Eh, Em, Es, PBh, PBm, PBs, PEh, PEm, PEs, zeitDifHours, zeitDifMinutes, zeitDifSeconds, projektArbeitBeschreibung} = this.state;
    return (
      <div>
      <div class="selection"> 
         <ProjectSelection user={user} handleSelection={this.handleProjectSelection}/>
        {projectSelected ?
        <div class="selectionItem"> 
         <AktivitätenSelection project={project} handleSelection={this.handleAktivitätSelection}/>
         <IconButton onClick={this.handleAktSelectionCLose}><CancelIcon sx={{color: "#401F65"}}/></IconButton></div>:null}
        {aktivitätSelected ?
         <div class="selectionItem">
         <ProjektarbeitenSelection aktivität={aktivität} handleSelection={this.handleProjektarbeitSelection}/>
         <IconButton onClick={this.handlePrArSelectionCLose}><CancelIcon sx={{color: "#401F65"}}/></IconButton></div>:null}
      </div>
      <div class="zeitContainer">
      <div class="zeitWrapper">
        {kommenClicked ?
      <div class="zeitAngabe">
        {String(stunden).padStart(2, "0")}:{String(minuten).padStart(2, "0")}:{String(sekunden).padStart(2, "0")}
    </div>:<div class="zeitAngabe">
       00:00:00
    </div>}
      <div class="workBtns">
        <Kommen date={kommen? kommen.zeitpunkt:null} handleClick={this.handleKommenClicked}/>
        <Gehen date={gehen? gehen.zeitpunkt:null} handleClick={this.handleGehenClicked}/>
        {kommenClicked ?
        <Pause beginn={pausenBeginn? pausenBeginn.zeitpunkt:null} ende={pausenEnde? pausenEnde.zeitpunkt:null} handlePauseClicked={this.addPausenBeginn} handlePauseDone={this.addPausenEnde}/>
      :null}</div>
      {kommenAlert ? 
      <div>
      <Dialog
        open={kommenAlert}
        onClose={this.handleKommenAlertCLose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Wichtige Informationen für die Zeiterfassung!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Pro Tag darf keine Arbeitszeit über <strong>10 Stunden</strong> erfasst werden. <br/>
            Nach mindestens <strong>6 Stunden</strong> muss eine Pause von mindestens <strong>45 Minuten</strong> erfasst werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleKommenAlertCLose} autoFocus>
            Akzeptieren
          </Button>
        </DialogActions>
      </Dialog>
    </div>:kommenErrorAlert?
    <div><Dialog
    open={kommenErrorAlert}
    onClose={this.handleKommenErrorAlertCLose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Unzureichende Informationen
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Um deine Arbeitszeit zu erfassen, musst du erst ein <strong>Projekt</strong> eine <strong>Aktivität</strong> und eine <strong>Projektarbeit</strong> auswählen!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.handleKommenErrorAlertCLose} autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog></div>:null}

  {gehenAlert ? 
  <div><Dialog
  open={gehenAlert}
  onClose={this.handleGehenAlertCLose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    Arbeitszeit erfolgreich erfasst.
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Arbeitsbeginn: <strong>{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</strong> <br/>
      Arbeitsende: <strong>{String(Eh).padStart(2, "0")}:{String(Em).padStart(2, "0")}:{String(Es).padStart(2, "0")}</strong> <br/>
      Pause: von <strong>{String(PBh).padStart(2, "0")}:{String(PBm).padStart(2, "0")}:{String(PBs).padStart(2, "0")}</strong> bis <strong>{String(PEh).padStart(2, "0")}:{String(PEm).padStart(2, "0")}:{String(PEs).padStart(2, "0")}</strong><br/>
      Das ergibt eine Arbeitszeit von: <strong>{String(zeitDifHours).padStart(2, "0")}:{String(zeitDifMinutes).padStart(2, "0")}:{String(zeitDifSeconds).padStart(2, "0")}</strong>
    </DialogContentText><br/><br/>
    <DialogContentText id="alert-dialog-description">
      Kurze Beschreibung deiner Tätigkeit:<br/>
      <TextField
        color="secondary"
          id="outlined-textarea"
          label="Tätigkeitsbeschreibung"
          placeholder="Placeholder"
          multiline
          value={projektArbeitBeschreibung}
          onChange={this.textFieldValueChange}
          fullWidth
        />
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={this.handleGehenAlertCLose} autoFocus>
      Abschicken
    </Button>
  </DialogActions>
</Dialog></div>:null}
      </div>
      </div>
      </div>
    )
  }
}

Zeiterfassung.propTypes = {
  user: PropTypes.any,
}

export default Zeiterfassung
