import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Ereignisbuchung.css'

export class Ereignisbuchung extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
   
    };
  }

  render() {
    return (
      <div>
        Ereignisbuchung
      </div>
    )
  }
}

Ereignisbuchung.propTypes = {
    user: PropTypes.any,
    Cuser: PropTypes.any,
  }
export default Ereignisbuchung