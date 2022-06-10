import React, { Component } from 'react';
import './Zeiterfassung.css'
import PropTypes from 'prop-types'
import ProjectSelection from '../components/Zeiterfassung/ProjectSelection';
import AktivitätenSelection from '../components/Zeiterfassung/AktivitätenSelection';
import ProjektarbeitenSelection from '../components/Zeiterfassung/ProjektarbeitenSelection';
import Grid from '@mui/material/Grid';
import Kommen from '../components/Zeiterfassung/Kommen';
import Gehen from '../components/Zeiterfassung/Gehen';
import Pause from '../components/Zeiterfassung/Pause';




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
      sekunden: 0
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

  handleKommenClicked = () => {
    this.setState({
        kommenClicked: true
    });
    const update = () => {
      var day1 = new Date("2022-06-10T21:00:00"); 
      var day2 = new Date();
      var seconds = Math.floor((day2 - (day1))/1000);
      var minutes = Math.floor(seconds/60);
      var hours = Math.floor(minutes/60);
      var days = Math.floor(hours/24);
      
      hours = hours-(days*24);
      minutes = minutes-(days*24*60)-(hours*60);
      seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
      console.log('days',days)
      this.setState({
          stunden: hours,
          minuten: minutes,
          sekunden: seconds
      })
  }

  update();

  const interval = setInterval(()=> {
      update();
  }, 1000);

  return ()=>clearInterval(interval);
 
}

  render() {
    const {user} = this.props;
    const {projectSelected, aktivitätSelected, project, aktivität, kommenClicked, stunden, minuten, sekunden} = this.state;
    return (
      <div>
      <div class="selection">
         <ProjectSelection user={user} handleSelection={this.handleProjectSelection}/>
        {projectSelected ?
         <AktivitätenSelection project={project} handleSelection={this.handleAktivitätSelection}/>:null}
        {aktivitätSelected ?
         <ProjektarbeitenSelection aktivität={aktivität}/>:null}
      </div>
      <div>
        {kommenClicked ?
      <div class="zeitAngabe">
        {String(stunden).padStart(2, "0")}:{String(minuten).padStart(2, "0")}:{String(sekunden).padStart(2, "0")}{console.log('kommen', kommenClicked)}
    </div>:null}
      <div class="workBtns">
        <Kommen handleClick={this.handleKommenClicked}/>
        <Gehen/>
        <Pause/>
      </div></div>
      </div>
    )
  }
}

Zeiterfassung.propTypes = {
  user: PropTypes.any,
}

export default Zeiterfassung
