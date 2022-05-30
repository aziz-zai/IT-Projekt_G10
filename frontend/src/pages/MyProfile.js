import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import OneAPI from '../api/OneAPI'
import PropTypes from 'prop-types'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import './MyProfile.css'
export class MyProfile extends Component {
    constructor(props) {
        super(props);
        // Init state
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
      const {user, Cuser} = this.props;
    return (
      <div>
        {Cuser ?
        <div>
        <SideBar toggle={this.handleOpenStateChange} Open={this.state.Open} user={Cuser}/>
        <NavBar toggle={this.handleOpenStateChange} user={Cuser} nav="navBlack"/> </div>
      :null}

        {user?
        <div class="ProfileWrapper">
          {user[0].benutzername}
        </div>
        :null}
      </div>
    )
  }
}

MyProfile.propTypes = {
    user: PropTypes.any.isRequired,
    Cuser: PropTypes.any.isRequired,
  }

export default MyProfile