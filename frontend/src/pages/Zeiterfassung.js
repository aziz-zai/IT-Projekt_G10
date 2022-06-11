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




export class Zeiterfassung extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      project: null,
      aktivität: null,
      projectSelected: false,
      aktivitätSelected: false,
      kommenClicked: false,
      stunden: 0,
      minuten: 0,
      sekunden: 0,
    };
  }

  componentDidMount() {
  
  }

  /** gets the balance for this account */

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

  handleAktSelectionCLose = () => {
    this.setState({
      projectSelected: false,
      aktivitätSelected: false
    })
	}

  handlePrArSelectionCLose = () => {
    this.setState({
      aktivitätSelected: false
    })
  }

  handleKommenClicked = () => {
    this.setState({
        kommenClicked: true,
    });
    var day1 = new Date(); 
    const update = () => { 
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

  update();

  this.interval = setInterval(()=> {
      update();
  }, 1000);

}
handleGehenClicked = () => {
  clearInterval(this.interval);
}

  render() {
    const {user} = this.props;
    const {projectSelected, aktivitätSelected, project, aktivität, kommenClicked, stunden, minuten, sekunden} = this.state;
    return (
      <div>
      <div class="selection">{console.log("Project", project, "aktiv", aktivität)}
         <ProjectSelection user={user} handleSelection={this.handleProjectSelection}/>
        {projectSelected ?
        <div class="selectionItem"> 
         <AktivitätenSelection project={project} handleSelection={this.handleAktivitätSelection}/>
         <IconButton onClick={this.handleAktSelectionCLose}><CancelIcon sx={{color: "#401F65"}}/></IconButton></div>:null}
        {aktivitätSelected ?
         <div class="selectionItem">
         <ProjektarbeitenSelection aktivität={aktivität}/>
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
        <Kommen handleClick={this.handleKommenClicked}/>
        <Gehen handleClick={this.handleGehenClicked}/>
        <Pause/>
      </div>
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
