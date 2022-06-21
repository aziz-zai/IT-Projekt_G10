import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PauseIcon from '@mui/icons-material/Pause';
import EjectIcon from '@mui/icons-material/Eject';
import { IconButton } from '@mui/material';
import './Pause.css'



export class Pause extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
        pauseClicked: false
    };
  }

  componentDidMount() {
  }
  handlePauseClicked = () => {
        this.setState({
            pauseClicked: true
        });
        this.props.handlePauseClicked();
}


  render() {
    const {beginn, ende} = this.props;
    const {pauseClicked} = this.state;
    const beginnTime = new Date(beginn);
    const Bh = beginnTime.getHours(); 
    const Bm = beginnTime.getMinutes(); 
    const Bs = beginnTime.getSeconds(); 
    const endeTime = new Date(ende);
    const Eh = endeTime.getHours(); 
    const Em = endeTime.getMinutes(); 
    const Es = endeTime.getSeconds(); 
    return (
        <div  class="BtnPauseContainer">
          {beginn?
          <div class="pause">{String(Bh).padStart(2, "0")}:{String(Bm).padStart(2, "0")}:{String(Bs).padStart(2, "0")} - 
          {ende? <div>{String(Eh).padStart(2, "0")}:{String(Em).padStart(2, "0")}:{String(Es).padStart(2, "0")}</div>:null} </div>:null}
        <div class="BtnPauseWrapper">
            <IconButton onClick={this.handlePauseClicked}>
            <PauseIcon sx={{ fontSize: 100, color: "orange" }} />
            </IconButton>
        </div>
        <h5 class="BtnPauseText">Pause</h5>
    </div>
    )
  }
}

Pause.propTypes = {
  handleSelection: PropTypes.any,
  user: PropTypes.any,
  handlePauseClicked: PropTypes.any,
  beginn: PropTypes.any,
  ende: PropTypes.any,
}

export default Pause
