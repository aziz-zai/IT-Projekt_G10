import React, { Component } from 'react';
import './Zeiterfassung.css'
import PropTypes from 'prop-types'
import ProjectSelection from '../components/Zeiterfassung/ProjectSelection';
import AktivitätenSelection from '../components/Zeiterfassung/AktivitätenSelection';
import ProjektarbeitenSelection from '../components/Zeiterfassung/ProjektarbeitenSelection';
import Grid from '@mui/material/Grid';



export class Zeiterfassung extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      project: null,
      aktivität: null,
      projectSelected: false,
      aktivitätSelected: false,

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


  render() {
    const {user} = this.props;
    const {projectSelected, aktivitätSelected, project, aktivität} = this.state;
    return (
      <div>
      <div class="selection">
         <ProjectSelection user={user} handleSelection={this.handleProjectSelection}/>
        {projectSelected ?
         <AktivitätenSelection project={project} handleSelection={this.handleAktivitätSelection}/>:null}
        {aktivitätSelected ?
         <ProjektarbeitenSelection aktivität={aktivität}/>:null} {console.log('aktivität',aktivität )}
      </div>
      <div>
      </div>
      </div>
    )
  }
}

Zeiterfassung.propTypes = {
  user: PropTypes.any,
}

export default Zeiterfassung
