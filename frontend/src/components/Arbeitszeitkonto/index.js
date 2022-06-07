import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Arbeitszeitkonto.css'

export class Arbeitszeitkonto extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
   
    };
  }

  render() {
    return (
      <div class="test">Arbeitszeitkonto
        
      </div>
    )
  }
}

Arbeitszeitkonto.propTypes = {
    user: PropTypes.any,
    Cuser: PropTypes.any,
  }
export default Arbeitszeitkonto