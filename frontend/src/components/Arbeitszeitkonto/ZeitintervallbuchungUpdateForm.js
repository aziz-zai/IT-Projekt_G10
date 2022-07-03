import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import OneAPI from '../../api/OneAPI';
import KommenBO from '../../api/KommenBO';
import GehenBO from '../../api/GehenBO';
import ProjektarbeitBO from '../../api/ProjektarbeitBO';
import EreignisBO from '../../api/EreignisBO';
import CircularProgress from '@mui/material/CircularProgress';
import ZeitintervallbuchungBO from '../../api/ZeitintervallbuchungBO';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';

export class ZeitintervallbuchungUpdateForm extends Component {
 // Init state
 constructor(props) {
    super(props);

this.state = {
  zeitintervallBeginn:"",
  zeitintervallEnde: "",
  zeitintervallBezeichnung: "",
  projektarbeitBeschreibung: "",
  loading: false
};
}



handleFormClosed = () => {
    this.props.onClose();
}

updateProjektarbeit = () => {
  let newProjektarbeit = Object.assign(new ProjektarbeitBO(), this.props.zeitintervall);
  newProjektarbeit.setBezeichnung(this.state.zeitintervallBezeichnung)
  newProjektarbeit.setBeschreibung(this.state.projektarbeitBeschreibung)
  OneAPI.getAPI().updateProjektarbeit(newProjektarbeit, this.props.zeitintervall.id).then(projektarbeit =>
    this.props.saveProjektarbeit(projektarbeit)
    ).catch(e =>
      this.setState({ // Reset state with error from catch 

      }),
    );
  // set loading to true
  this.setState({

  });
}

updateKommen = () => {
  let newKommen = Object.assign(new KommenBO(), this.props.ereignis1);
  newKommen.setZeitpunkt(this.state.zeitintervallBeginn)
  OneAPI.getAPI().updateKommen(newKommen, this.props.ereignis1.id).then(kommen =>
    this.props.saveKommen(kommen)
    ).catch(e =>
      this.setState({ // Reset state with error from catch 

      }),
    );
  // set loading to true
  this.setState({

  });
}
updateZeitintervallbuchung = () => {
  let newBuchung = Object.assign(new ZeitintervallbuchungBO(), this.props.buchung);
  OneAPI.getAPI().updateZeitintervallbuchung(newBuchung, this.props.buchung.id).then(buchung =>
    this.props.saveBuchung(buchung)
    ).catch(e =>
      this.setState({ // Reset state with error from catch 

      }),
    );
  // set loading to true
  this.setState({

  });
}
updateGehen = () => {
  let newGehen = Object.assign(new GehenBO(), this.props.ereignis2);
  newGehen.setZeitpunkt(this.state.zeitintervallEnde)
  OneAPI.getAPI().updateGehen(newGehen, this.props.ereignis2.id).then(gehen =>
    this.props.saveGehen(gehen)
    ).catch(e =>
      this.setState({ // Reset state with error from catch 

      }),
    );
  // set loading to true
  this.setState({

  });
}

updateEreignis = (zeitpunkt, obj, isEreignis1) => {
  let newEreignis = Object.assign(new EreignisBO(), obj);
  newEreignis.setZeitpunkt(zeitpunkt)
  OneAPI.getAPI().updateKommen(newEreignis, obj.id).then(ereignis =>{
    if(isEreignis1){
    this.props.saveEreignis1(ereignis)
    }
    else{this.props.saveEreignis2(ereignis)}
  }).catch(e =>
      this.setState({ // Reset state with error from catch 

      }),
    );
  // set loading to true
  this.setState({

  });
}

handleUpdate = () => {
  if(this.props.buchung.bezeichnung == "Projektarbeit"){
    this.updateProjektarbeit();
    this.updateKommen();
    this.updateGehen();
  }
  else{
  this.updateEreignis(this.state.zeitintervallBeginn, this.props.ereignis1, true);
  this.updateEreignis(this.state.zeitintervallEnde, this.props.ereignis2, false);
} 
this.updateZeitintervallbuchung()
}

dateFilterChanged = (event) => {
  this.setState({
    [event.target.id]: event.target.value,
  });
}

textFieldValueChange = (event) => {
  this.setState({
    [event.target.id]: event.target.value,
  });
}

componentDidMount = () => {
  this.setState({
    loading: true
  })
  setTimeout(() => {
    let zb = "", ze="", bz="", bs=""
    if(this.props.zeitintervall){
      if(this.props.buchung.bezeichnung == 'Projektarbeit'){
        bz= this.props.zeitintervall.bezeichnung
        bs= this.props.zeitintervall.beschreibung
      }
      else{
        bz= this.props.zeitintervall.bezeichnung
      }
    }
    if(this.props.ereignis1){
      zb= this.props.ereignis1.zeitpunkt
    }
    if(this.props.ereignis2){
      ze= this.props.ereignis2.zeitpunkt
    }
  this.setState({
  zeitintervallBeginn: zb,
  zeitintervallEnde: ze,
  zeitintervallBezeichnung: bz,
  projektarbeitBeschreibung: bs,
  loading: false
  })
  }, 3000);
}
  render() {
      const {show} = this.props;
      const {zeitintervallBeginn, projektarbeitBeschreibung, zeitintervallBezeichnung, zeitintervallEnde} = this.state;
    return (
        show ?
        <Dialog
        open={show}
        onClose={this.handleFormClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <DialogTitle id='form-dialog-title'>Zeitintervallbuchung bearbeiten
    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleFormClosed}>
       <CloseIcon />
    </IconButton></DialogTitle><br/>
    {this.state.loading ?
    <CircularProgress/>:
        <DialogContent>
          {(this.props.buchung.bezeichnung == "Projektarbeit") ?
          <DialogContentText id="alert-dialog-description">
          <TextField
            color="secondary"
            type='text' required
            id="zeitintervallBezeichnung"
            label="Bezeichnung"
            value={zeitintervallBezeichnung}
            onChange={this.textFieldValueChange}
            />  
          </DialogContentText> :null}
          <DialogContentText id="alert-dialog-times">
          <TextField
      color="secondary"
      id="zeitintervallBeginn"
      label="Beginn"
      type="datetime-local"
      value={zeitintervallBeginn ? zeitintervallBeginn:this.props.ereignis1.zeitpunkt }
      onChange={this.dateFilterChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    /> &nbsp;&nbsp;
    <TextField
      color="secondary"
      id="zeitintervallEnde"
      label="Ende"
      type="datetime-local"
      value={zeitintervallEnde ? zeitintervallEnde:this.props.ereignis2.zeitpunkt}
      onChange={this.dateFilterChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
          </DialogContentText><br/>
          {(this.props.buchung.bezeichnung == "Projektarbeit") ?
          <DialogContentText id="projektarbeit-beschreibung">
          <TextField
          color="secondary"
          id="projektarbeitBeschreibung"
          label="Tätigkeitsbeschreibung"
          placeholder="Eine kurze Beschreibung der Projektarbeit"
          multiline
          value={projektarbeitBeschreibung ? projektarbeitBeschreibung : this.props.zeitintervall.beschreibung}
          onChange={this.textFieldValueChange}
          fullWidth
        />
            </DialogContentText> :null}<br/><br/>
        </DialogContent>}
        <DialogActions>
          <Button onClick={this.handleUpdate} autoFocus>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>:null
    )
  }
}

ZeitintervallbuchungUpdateForm.propTypes = {
   show: PropTypes.any,
   onClose: PropTypes.any,
   ereignis1: PropTypes.any,
   ereignis2: PropTypes.any,
   buchung: PropTypes.any,
   zeitintervall: PropTypes.any,
   saveProjektarbeit: PropTypes.any,
   saveKommen: PropTypes.any,
   saveGehen: PropTypes.any,
   saveEreignis1: PropTypes.any,
   saveEreignis2: PropTypes.any,
   saveBuchung: PropTypes.any
  }
export default ZeitintervallbuchungUpdateForm