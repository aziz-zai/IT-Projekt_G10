import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import './Arbeitszeitkonto.css'

export class Arbeitszeitkonto extends Component {

    constructor(props) {
        super(props);
    this.state = {
    };
  }


  render() {
    const {Cuser, user} = this.props;
    return (
      <div class="">Arbeitszeitkonto
      
      </div>
    )
  }
}

Arbeitszeitkonto.propTypes = {
    user: PropTypes.any,
    Cuser: PropTypes.any,
  }
export default Arbeitszeitkonto