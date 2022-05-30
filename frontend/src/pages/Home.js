import React, { Component } from 'react';
import './Home.css'
import NavBar from '../components/NavBar'
import test from '../media/test.svg'
import PropTypes from 'prop-types'
import OneAPI from '../api/OneAPI'
import UserBO from '../api/UserBO';
import SideBar from '../components/SideBar'
import Project from '../components/Project'
import { getTabsUtilityClass } from '@mui/material';
import MyProfile from './MyProfile';


export class Home extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      loadingInProgress: false,
      loadingError: null,
      Open: 'SideBarContainerClosed',
      check: true
    };
  }

  componentDidMount() {
 
  }

  /** gets the balance for this account */


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
      <div>
         <SideBar toggle={this.handleOpenStateChange} Open={this.state.Open} user={Cuser}/>
         <NavBar toggle={this.handleOpenStateChange} user={Cuser} nav="navBlack"/>
    <div class="ProjectList">
      {user ?
      <Project user={user}/>
      : null}
    </div>
    </div>
    )
  }
}

Home.propTypes = {
  Cuser: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
}

export default Home
