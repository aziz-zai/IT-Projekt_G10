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
      kommenZeit: null,
      gehenZeit: null,
      pausenBeginnZeit: null,
      pausenEndeZeit: null,
      pausenAlert: false
    };
  }

  componentDidMount() {
  
  }

  /** gets the balance for this account */

  addKommenIst = () => {
    OneAPI.getAPI().addKommenIst(this.props.user[0].id, this.state.projektarbeit, this.state.kommenZeit).then(kommen =>
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
    OneAPI.getAPI().addGehenIst(this.state.kommen.id, this.props.user[0].id, this.state.aktivität, this.state.gehenZeit).then(gehen => {
      this.setState({
        gehen: gehen,
        gehenAlert: true
      });
      return gehen
      }).then(gehen =>{
        const kommenTime = new Date(this.state.kommen.zeitpunkt);
        const gehenTime = new Date(gehen.zeitpunkt);
        const arbeitsZeitSeconds = Math.floor(((gehenTime - kommenTime))/1000)
        const minutes = Math.floor(arbeitsZeitSeconds/60);
        const hours = (minutes/60);
        const difHours = Math.floor(minutes/60);
        const rMinutes = (hours - difHours) * 60;
        const difMinutes = Math.round(rMinutes)

        this.setState({
              h: kommenTime.getHours(), 
              m: kommenTime.getMinutes(), 
              s: kommenTime.getSeconds(), 
              Eh: gehenTime.getHours(), 
              Em: gehenTime.getMinutes(), 
              Es: gehenTime.getSeconds(), 
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
    let newPausenBeginn = new EreignisBO(this.state.pausenBeginnZeit, "Pause")
    OneAPI.getAPI().addPausenBeginn(newPausenBeginn, this.props.user[0].id).then(pausenBeginn =>{
      this.setState({
        pausenBeginn: pausenBeginn,
      })
      return pausenBeginn
    }).then(pausenBeginn => this.addPausenEnde(pausenBeginn))
          .catch(e =>
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
      kommenZeit: null,
      gehenZeit: null,
      pausenBeginnZeit: null,
      pausenEndeZeit: null,
      pausenAlert: false
    })
    }
     ).catch(e =>
      console.log('projektarbeitIstfail', newProjektarbeitIst)
      );
    // set loading to true
    this.setState({
    });
  }
  addPausenEnde = (pausenBeginn) => {

    let newPausenEnde = new EreignisBO(this.state.pausenEndeZeit, "Pause")
    OneAPI.getAPI().addPausenEnde(newPausenEnde, pausenBeginn.id, this.props.user[0].id).then(pausenEnde =>{
      this.setState({
        pausenEnde: pausenEnde,
        pausenAlert: true,
      })
      return pausenEnde
    }).then(pausenEnde =>{
      const pausenBeginnTime = new Date(this.state.pausenBeginn.zeitpunkt);
      const pausenEndeTime = new Date(pausenEnde.zeitpunkt);
      const pausenZeitSeconds = Math.floor(((pausenEndeTime - pausenBeginnTime))/1000)
      const minutes = Math.floor(pausenZeitSeconds/60);
      const hours = (minutes/60);
      const difHours = Math.floor(minutes/60);
      const rMinutes = (hours - difHours) * 60;
      const difMinutes = Math.round(rMinutes)
    
      this.setState({
            PBh: pausenBeginnTime.getHours(), 
            PBm: pausenBeginnTime.getMinutes(), 
            PBs: pausenBeginnTime.getSeconds(), 
            PEh: pausenEndeTime.getHours(), 
            PEm: pausenEndeTime.getMinutes(), 
            PEs: pausenEndeTime.getSeconds(),
            zeitDifHours: difHours,
            zeitDifMinutes: difMinutes,
          })})
          .catch(e =>
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
handlepausenAlertCLose = () => {
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
      kommenZeit: null,
      gehenZeit: null,
      pausenBeginnZeit: null,
      pausenEndeZeit: null,
      pausenAlert: false
  })
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

dateFilterChanged = (event) => {
  this.setState({
    [event.target.id]: event.target.value,
  });
}

  render() {
    const {user} = this.props;
    const {projectSelected, aktivitätSelected, project, aktivität, kommenClicked, stunden, minuten, sekunden, kommen, 
      projektarbeitIst, gehen,pausenBeginn, pausenEnde, kommenAlert, kommenErrorAlert, gehenAlert,
    h, m, s, Eh, Em, Es, PBh, PBm, PBs, PEh, PEm, PEs, zeitDifHours, zeitDifMinutes, zeitDifSeconds, projektArbeitBeschreibung, kommenZeit, gehenZeit, 
    pausenBeginnZeit, pausenEndeZeit, pausenAlert} = this.state;
    return (
      <div>
      <div class="selection"> {console.log('gehenZeit', kommenZeit, gehenZeit)}
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
    
      <div class="workBtns">
        <div>
        <TextField
        id="kommenZeit"
        label="Von"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        value={kommenZeit}
        onChange={this.dateFilterChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> 
        <Kommen date={kommen? kommen.zeitpunkt:null} handleClick={this.handleKommenClicked}/></div>
        <div>
        <TextField
        id="gehenZeit"
        label="Bis"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        value={gehenZeit}
        onChange={this.dateFilterChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> 
        <Gehen date={gehen? gehen.zeitpunkt:null} handleClick={this.handleGehenClicked}/></div>

        <div>
        <TextField
        id="pausenBeginnZeit"
        label="Von"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        value={pausenBeginnZeit}
        onChange={this.dateFilterChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> <TextField
      id="pausenEndeZeit"
      label="Bis"
      type="datetime-local"
      defaultValue="2017-05-24T10:30"
      value={pausenEndeZeit}
      onChange={this.dateFilterChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    /> 
        <Pause beginn={pausenBeginn? pausenBeginn.zeitpunkt:null} ende={pausenEnde? pausenEnde.zeitpunkt:null} handlePauseClicked={this.addPausenBeginn} />
</div></div>
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
      Arbeitsende: <strong>{String(Eh).padStart(2, "0")}:{String(Em).padStart(2, "0")}:{String(Es).padStart(2, "0")}</strong> <br/><br/>
      Das ergibt eine Arbeitszeit von: <strong>{String(zeitDifHours).padStart(2, "0")}:{String(zeitDifMinutes).padStart(2, "0")}:00</strong>
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
{pausenAlert ? 
  <div><Dialog
  open={pausenAlert}
  onClose={this.handlepausenAlertCLose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    Pause erfolgreich erfasst.
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">

      Pause: von <strong>{String(PBh).padStart(2, "0")}:{String(PBm).padStart(2, "0")}:{String(PBs).padStart(2, "0")}</strong> bis <strong>{String(PEh).padStart(2, "0")}:{String(PEm).padStart(2, "0")}:{String(PEs).padStart(2, "0")}</strong><br/>
      Das ergibt eine Pause von: <strong>{String(zeitDifHours).padStart(2, "0")}:{String(zeitDifMinutes).padStart(2, "0")}:00</strong>
    </DialogContentText><br/><br/>
  </DialogContent>
  <DialogActions>
    <Button onClick={this.handlepausenAlertCLose} autoFocus>
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
