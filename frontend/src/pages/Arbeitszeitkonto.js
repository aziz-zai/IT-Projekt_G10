import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OneAPI from '../api/OneAPI'
import './Arbeitszeitkonto.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export class Arbeitszeitkonto extends Component {

    constructor(props) {
        super(props);
    this.state = {
      arbeitszeitKonto: null,
      ereignisbuchungSelected: false,
      zeitintervallbuchungSelected: true
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
componentDidMount(){
  this.loadArbeitszeitkonto();
}
  render() {
    const {arbeitszeitKonto, ereignisbuchungSelected, zeitintervallbuchungSelected} = this.state;
    return (
      <div>
        {arbeitszeitKonto ? 
        <div class="arbeitszeitKontoHeader">
        <div class="azkHeaderItem">Arbeitsleistung: <strong>{arbeitszeitKonto[0].arbeitsleistung} </strong>Stunden</div>
       <div class="azkHeaderItem">Urlaubskonto: <strong>{arbeitszeitKonto[0].urlaubskonto} </strong>Tage</div>
       <div class="azkHeaderItem">Gleitzeit: <strong>{arbeitszeitKonto[0].gleitzeit}</strong> Stunden</div>
       </div>:null}
       <div class="buchungContainer">
         <div class="buchungHeader">
           <div class="buchungFilter"><FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Ist Buchungen" />
        <FormControlLabel value="male" control={<Radio />} label="Soll Buchungen" />
      </RadioGroup>
    </FormControl></div>
           <button class="abwesenheitBtn"> Abwesenheit </button>
         </div>
         <div class="buchungSelection">
           <div class="selectionItem1"><button class={zeitintervallbuchungSelected ? "selectionBtn" : "selectionBtnAlt"} onClick={this.handleZeitintervallbuchung}>Zeitintervallbuchungen</button></div>
           <div class="selectionItem2"><button class={ereignisbuchungSelected ? "selectionBtn" : "selectionBtnAlt"} onClick={this.handleEreignisbuchung}>Ereignisbuchungen</button></div>
         </div>
         <div class="buchungen"></div>
       </div>
      </div>
    )
  }
}

Arbeitszeitkonto.propTypes = {
    user: PropTypes.any,
  }
export default Arbeitszeitkonto