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
    if(this.state.pauseClicked == true){
        this.setState({
            pauseClicked: false
        });
    }
    else{
        this.setState({
            pauseClicked: true
        });
    }
}

  render() {
    const {user} = this.props;
    const {pauseClicked} = this.state;
    return (
        <div onClick={this.handlePauseClicked} class="BtnContainer">
        <div class="BtnWrapper">
            {pauseClicked ?
            <iconButton>
            <EjectIcon sx={{ fontSize: 100, color: "orange", transform: "rotate(90deg)" }}/>
            </iconButton>:
            <iconButton>
            <PauseIcon sx={{ fontSize: 100, color: "orange" }} />
            </iconButton>}
        </div>
        <h5 class="BtnText">Pause</h5>
    </div>
    )
  }
}

Pause.propTypes = {
  handleSelection: PropTypes.any,
  user: PropTypes.any
}

export default Pause
