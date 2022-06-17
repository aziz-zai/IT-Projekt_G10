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
    const { date} = this.props;
    const {} = this.state;
    const time = new Date(date);
    const h = time.getHours(); 
    const m = time.getMinutes(); 
    const s = time.getSeconds(); 
    return (
        <div class="BtnGehenContainer">
          {date?
          <div class="endTime">{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</div>:null} 
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
  user: PropTypes.any,
  date: PropTypes.any
}

export default Gehen
