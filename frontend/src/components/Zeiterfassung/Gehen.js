import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import { IconButton } from '@mui/material';
import './Gehen.css'



export class Gehen extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {

    };
  }

  componentDidMount() {
  }
  handleGehenClicked = () => {
    this.props.handleClick()
}

  render() {
    const {user} = this.props;
    const {selectedProject, project} = this.state;
    return (
        <div class="BtnGehenContainer">
        <div class="BtnGehenWrapper">
            <IconButton onClick={this.handleGehenClicked}>
            <CallMissedOutgoingIcon sx={{ fontSize: 100, color: "red" }} />
            </IconButton>
        </div>
        <h5 class="BtnGehenText">Arbeitsende</h5>
    </div>
    )
  }
}

Gehen.propTypes = {
  handleClick: PropTypes.any,
  user: PropTypes.any
}

export default Gehen