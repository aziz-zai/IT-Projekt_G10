import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import './Arbeitszeitkonto.css'

export class Arbeitszeitkonto extends Component {

    constructor(props) {
        super(props);
    this.state = {
        Open: 'SideBarContainerClosed',
    };
  }

  handleOpenStateChange = () => {
    if(this.state.Open =='SideBarContainerOpen'){
      this.setState({
        Open: 'SideBarContainerClosed'
      })
    }
    if(this.state.Open =='SideBarContainerClosed'){
		this.setState({
			Open: 'SideBarContainerOpen'
		})
  }
    }

  render() {
    const {Cuser, user} = this.props;
    return (
      <div class="">Arbeitszeitkonto
        <SideBar toggle={this.handleOpenStateChange} Open={this.state.Open} user={Cuser}/>
         <NavBar toggle={this.handleOpenStateChange} user={Cuser} nav="navBlack"/>
      </div>
    )
  }
}

Arbeitszeitkonto.propTypes = {
    user: PropTypes.any,
    Cuser: PropTypes.any,
  }
export default Arbeitszeitkonto