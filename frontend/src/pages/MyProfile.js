import React, { Component } from 'react'
import OneAPI from '../api/OneAPI'
import UserBO from '../api/UserBO'
import PropTypes from 'prop-types'
import './MyProfile.css'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export class MyProfile extends Component {
    constructor(props) {
        super(props);
        // Init state
        let fn = '', ln = ''
          if(props.user){
              fn= props.user[0].vorname;
              ln= props.user[0].nachname;
        }

        this.state = {
          firstName: fn,
          lastName: ln,
          success: false,
          vertical: 'bottom',
          horizontal: 'left',
          upUser: new UserBO()
        };
      }


      updateUser = () => {
        // clone the original cutomer, in case the backend call fails
        let updatedUser = Object.assign(new UserBO(), this.props.user[0]);
        this.setState({
          success: true,// no error message
      });
        // set the new attributes from our dialog
        updatedUser.setVorname(this.state.firstName);
        updatedUser.setNachname(this.state.lastName);
        OneAPI.getAPI().updateUser(updatedUser).then(user => {
          this.setState({
              success: true,// no error message
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
      getUserbygid = () => {
        OneAPI.getAPI().getUserGid(this.props.Cuser.uid).then(user =>
          this.setState({
            upUser: user,
            firstName: user[0].vorname,
            lastName: user[0].nachname,
          })
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
              upUser: null,
            })
          );
        // set loading to true
        this.setState({

        });
      }

      handleClose = () => {
        this.setState({
          success: false
        })
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
      componentDidMount(){
        this.getUserbygid()
      }
      
    render() {  
      const {user, Cuser} = this.props;
      const {firstName, lastName, success, vertical, horizontal} = this.state;
    return (
      <div>
        {user?
        
        <div class="ProfileWrapper">
          <div class="ProfileContainer">
            <div><img class="ProfileAvatar" src={Cuser.photoURL}/></div> 
            <div class="ProfileContent">   
                <div>
                <TextField
                  color="secondary"
                    type='text' required
                    id="firstName"
                    label="Vorname"
                    value={firstName ? firstName:user[0].vorname}
                    onChange={this.textFieldValueChange}
                    /></div> &nbsp; <div><TextField
                    color="secondary"
                    type='text' required
                    id="lastName"
                    label="Nachname"
                    value={lastName ? lastName:user[0].nachname}
                    onChange={this.textFieldValueChange}
                    /></div>
              </div><div class="success">
                     {success ?
              <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert onClose={this.handleClose}>Profil Daten erfolgreich gespeichert!</Alert>
              </Stack>:null}</div>
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
    user: PropTypes.any,
    Cuser: PropTypes.any,
  }

export default MyProfile