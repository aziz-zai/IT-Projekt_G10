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
    const {} = this.props;
    const {} = this.state;
    return (
      <div class="BtnContainer">
        <div class="BtnWrapper">
            <iconButton onClick={this.handleKommenClicked}>
            <PlayForWorkIcon sx={{ fontSize: 100, color: "green" }} />
            </iconButton>
        </div>
        <h5 class="BtnText">Arbeitsbeginn</h5>
    </div>
    )
  }
}

Kommen.propTypes = {
  handleClick: PropTypes.any,

}

export default Kommen
