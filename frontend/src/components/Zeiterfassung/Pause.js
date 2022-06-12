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
}

handlePauseDone= () => {
  this.setState({
      pauseClicked: false
  });
}

  render() {
    const {user} = this.props;
    const {pauseClicked} = this.state;
    return (
        <div  class="BtnPauseContainer">
        <div class="BtnPauseWrapper">
            {pauseClicked ?
            <IconButton onClick={this.handlePauseDone}>
            <EjectIcon sx={{ fontSize: 100, color: "orange", transform: "rotate(90deg)" }}/>
            </IconButton>:
            <IconButton onClick={this.handlePauseClicked}>
            <PauseIcon sx={{ fontSize: 100, color: "orange" }} />
            </IconButton>}
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
  handlePauseDone: PropTypes.any,
}

export default Pause
