import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Zeiterfassung extends Component {

  render() {
    return (
      <div>Zeiterfassung</div>
    )
  }
}
Zeiterfassung.propTypes = {
    user: PropTypes.any,
    Cuser: PropTypes.any,
  }
export default Zeiterfassung