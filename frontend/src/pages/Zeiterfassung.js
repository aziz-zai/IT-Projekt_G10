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
      pausenEnde: null
    };
  }

  componentDidMount() {
  
  }

  /** gets the balance for this account */

  addKommenIst = () => {
    OneAPI.getAPI().addKommenIst(this.props.user[0].id, this.state.projektarbeit).then(kommen =>
      this.setState({
        kommen: kommen,
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
    OneAPI.getAPI().addGehenIst(this.state.kommen.id, this.props.user[0].id, this.state.aktivität).then(gehen =>
      this.setState({
        gehen: gehen,
      }),
      ).catch(e =>
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
    this.addKommenIst();
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
  clearInterval(this.interval);
}

  render() {
    const {user} = this.props;
    const {projectSelected, aktivitätSelected, project, aktivität, kommenClicked, stunden, minuten, sekunden, kommen, projektarbeitIst, gehen,pausenBeginn, pausenEnde} = this.state;
    return (
      <div>
      <div class="selection"> {console.log('data', pausenBeginn,"data2", pausenEnde )}
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
        <Pause beginn={pausenBeginn? pausenBeginn.zeitpunkt:null} ende={pausenEnde? pausenEnde.zeitpunkt:null} handlePauseClicked={this.addPausenBeginn} handlePauseDone={this.addPausenEnde}/>
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
