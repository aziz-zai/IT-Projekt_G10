import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import './Kommen.css';


export class Kommen extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {

    };
  }

  componentDidMount() {
  }


  render() {
    const {} = this.props;
    const {} = this.state;
    return (
      <div class="BtnContainer">
        <div class="BtnWrapper">
            <PlayForWorkIcon sx={{ fontSize: 100, color: "green" }} />
        </div>
        <h5 class="BtnText">Arbeitsbeginn</h5>
    </div>
    )
  }
}

Kommen.propTypes = {
  handleSelection: PropTypes.any,
  user: PropTypes.any
}

export default Kommen
