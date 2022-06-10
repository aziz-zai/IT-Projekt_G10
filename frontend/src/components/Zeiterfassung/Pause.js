import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PauseIcon from '@mui/icons-material/Pause';
import './Pause.css'



export class Pause extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {

    };
  }

  componentDidMount() {
  }


  render() {
    const {user} = this.props;
    const {selectedProject, project} = this.state;
    return (
        <div class="BtnContainer">
        <div class="BtnWrapper">
            <PauseIcon sx={{ fontSize: 100, color: "orange" }} />
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
