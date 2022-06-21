import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OneAPI from '../api/OneAPI'
import './Arbeitszeitkonto.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Ereignisbuchung from '../components/Arbeitszeitkonto/Ereignisbuchung';
import Zeitintervallbuchung from '../components/Arbeitszeitkonto/Zeitintervallbuchung';
import TextField from '@mui/material/TextField';
import Abwesenheit from '../components/Arbeitszeitkonto/Abwesenheit'

export class Arbeitszeitkonto extends Component {

    constructor(props) {
        super(props);
    this.state = {
      arbeitszeitKonto: null,
      ereignisbuchungSelected: false,
      zeitintervallbuchungSelected: true,
      startFilter: null,
      endFilter: null,
      istBuchung: true,
      openAbwesenheit: false

    };
  }


  loadArbeitszeitkonto = () => {
    OneAPI.getAPI().getArbeitszeitkonto(this.props.user[0].id).then(arbeitszeitKonto =>
      this.setState({
        arbeitszeitKonto: arbeitszeitKonto,
      }),
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          arbeitszeitKonto: null,
        })
      );
    // set loading to true
    this.setState({
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
openAbwesenheit = () => {
  this.setState({
    openAbwesenheit: true
  })
}

handleAbwesenheitClose = () => {
  this.setState({
    openAbwesenheit: false
  })
}
componentDidMount(){
  this.loadArbeitszeitkonto();
}
  render() {
    const {arbeitszeitKonto, ereignisbuchungSelected, zeitintervallbuchungSelected, startFilter, endFilter, istBuchung, openAbwesenheit} = this.state;
    const {user} = this.props;
    return (
      <div>
        {arbeitszeitKonto ? 
        <div class="arbeitszeitKontoHeader">
        <div class="azkHeaderItem">Arbeitsleistung: <strong>{arbeitszeitKonto[0].arbeitsleistung} </strong>Stunden</div>
       <div class="azkHeaderItem">Urlaubskonto: <strong>{arbeitszeitKonto[0].urlaubskonto} </strong>Tage</div>
       <div class="azkHeaderItem">Gleitzeit: <strong>{arbeitszeitKonto[0].gleitzeit}</strong> Stunden</div>
       </div>:null}
       <button class="abwesenheitBtn" onClick={this.openAbwesenheit}> Abwesenheit </button>
       <Abwesenheit show={openAbwesenheit} onClose={this.handleAbwesenheitClose} user={user}/>
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
           <div class="selectionItem1"><button class={zeitintervallbuchungSelected ? "selectionBtn" : "selectionBtnAlt"} onClick={this.handleZeitintervallbuchung}>Zeitintervallbuchungen</button></div>
           <div class="selectionItem2"><button class={ereignisbuchungSelected ? "selectionBtn" : "selectionBtnAlt"} onClick={this.handleEreignisbuchung}>Ereignisbuchungen</button></div>
         </div>
         <div class="buchungen">
           {zeitintervallbuchungSelected ?
           <Zeitintervallbuchung istBuchung={istBuchung} startFilter={startFilter} endFilter={endFilter} user={user}/>
          : <Ereignisbuchung istBuchung={istBuchung} startFilter={startFilter} endFilter={endFilter} user={user}/>}
         </div>
       </div>
      </div>
      
    )
  }
}

Arbeitszeitkonto.propTypes = {
    user: PropTypes.any,
  }
export default Arbeitszeitkonto