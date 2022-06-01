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
        let fn = '', ln = '';
        if (props.user) {
          fn = props.user[0].vorname;
          ln = props.user[0].nachname;
        }
        this.state = {
          Open: 'SideBarContainerClosed', 
          firstName: fn,
          lastName: ln,
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

      textFieldValueChange = (event) => {
        const value = event.target.value;
    
        let error = false;
        if (value.trim().length === 0) {
          error = true;
        }
    
        this.setState({
          [event.target.id]: event.target.value,
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
              <div>
              {console.log('firstName', firstName)}
              <form sx={{width: '100%'}} noValidate autoComplete='off'>
                <TextField
                    autoFocus type='text' required
                    id="firstName"
                    label="Vorname"
                    value={firstName}
                    onChange={this.textFieldValueChange}
                    /> &nbsp; <TextField
                    autoFocus type='text' required
                    id="lastName"
                    label="Nachname"
                    value={lastName}
                    onChange={this.textFieldValueChange}
                    />
                </form>
                </div>
                
              </div>
              <div class="saveBtnWrapper">
                  <button onClick={this.updateUser}class="saveBtn">Speichern</button>
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