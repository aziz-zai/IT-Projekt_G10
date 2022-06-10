import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
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


  render() {
    const {user} = this.props;
    const {selectedProject, project} = this.state;
    return (
        <div class="BtnContainer">
        <div class="BtnWrapper">
            <CallMissedOutgoingIcon sx={{ fontSize: 100, color: "red" }} />
        </div>
        <h5 class="BtnText">Arbeitsende</h5>
    </div>
    )
  }
}

Gehen.propTypes = {
  handleSelection: PropTypes.any,
  user: PropTypes.any
}

export default Gehen
