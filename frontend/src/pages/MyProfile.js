import React, { Component } from 'react'
import OneAPI from '../api/OneAPI'
import UserBO from '../api/UserBO'
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
          firstName: "",
          lastName:"",
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
      updateUser = () => {
        // clone the original cutomer, in case the backend call fails
        let updatedUser = Object.assign(new UserBO(), this.props.user[0]);
        // set the new attributes from our dialog
        updatedUser.setVorname(this.state.firstName);
        updatedUser.setNachname(this.state.lastName);
        OneAPI.getAPI().updateUser(updatedUser).then(user => {
          this.setState({
                // no error message
          });
          // keep the new state as base state
          this.baseState.firstName = this.state.firstName;
          this.baseState.lastName = this.state.lastName;  // call the parent with the new User
        }).catch(e =>
          this.setState({
                    // show error message
          })
        );
        // set loading to true
        this.setState({
                 // disable error message
        });
      }

    render() {  
      const {user, Cuser} = this.props;
      const {firstName, lastName} = this.state;
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
                    autoFocus type='text' required
                    id="firstName"
                    label="Vorname"
                    defaultValue={user.vorname}
                    value={firstName}
                    variant="standard"
                    /> &nbsp; <TextField
                    autoFocus type='text' required
                    id="lastName"
                    label="Nachname"
                    defaultValue={user.nachname}
                    value={lastName}
                    variant="standard"
                    />
                </div>
                
              </div>
              <div class="saveBtnWrapper">
                  <button class="saveBtn">Speichern</button>
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