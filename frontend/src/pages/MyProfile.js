import React, { Component } from 'react'
import OneAPI from '../api/OneAPI'
import PropTypes from 'prop-types'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import './MyProfile.css'
import TextField from '@mui/material/TextField';
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
          <div class="ProfileContainer">
            <div><img class="ProfileAvatar" src={Cuser.photoURL}/></div> 
          <div class="ProfileContent">
            <div><TextField
          id="standard-helperText"
          label="Vorname"
          defaultValue="Default Value"
          variant="standard"
        /> &nbsp; <TextField
        id="standard-helperText"
        label="Nachname"
        defaultValue="Default Value"
        variant="standard"
      /></div>
            </div>
          </div>
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