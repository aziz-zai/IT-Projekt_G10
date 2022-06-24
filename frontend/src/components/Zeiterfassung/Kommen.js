import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import { IconButton } from '@mui/material';
import './Kommen.css';


export class Kommen extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
        kommen: '',
    };
  }

  componentDidMount() {
  }
  handleKommenClicked = () => {
    this.props.handleClick()
}


  render() {
    const {date} = this.props;
    const {} = this.state;
    const time = new Date(date);
    const h = time.getHours(); 
    const m = time.getMinutes(); 
    const s = time.getSeconds(); 
    return (
      <div class="BtnKommenContainer">
                {date?
          <div class="startTime">{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</div>:null} 
        <div class="BtnKommenWrapper">
            <IconButton onClick={this.handleKommenClicked}>
            <PlayForWorkIcon sx={{ fontSize: 100, color: "green" }} />
            </IconButton>
        </div>
        <h5 class="BtnKommenText">Arbeitsbeginn</h5>
    </div>
    )
  }
}

Kommen.propTypes = {
  handleClick: PropTypes.any,
  date: PropTypes.any

}

export default Kommen
