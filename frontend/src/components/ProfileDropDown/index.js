import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Popover, IconButton, 
Avatar, ClickAwayListener, Typography, Paper, Button, Grid, Divider } from '@mui/material';
import firebase from 'firebase/compat/app';
import firebasConfig from '../../firebaseconfig'
import {Link} from 'react-router-dom'
import OneAPI from '../../api/OneAPI';
import './ProfileDropDown.css'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import ContextErrorMessage from '../Dialogs/ContextErrorMessage';
import LoadingProgress from '../Dialogs/LoadingProgress';
export class ProfileDropDown extends Component {
    #avatarButtonRef = createRef();
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            deleteDialog: false,
            deletingInProgress: false,
            deletingError: null
        }
    }

    deleteProfile = () => {
      OneAPI.getAPI().deleteUser(this.props.dbuser[0].id).then(dbuser => {
        this.setState({
          deletingInProgress: false,              // disable loading indicator  
          deletingError: null                     // no error message
        });
        this.handleSignOutButtonClicked();  // call the parent with the deleted user
      }).catch(e =>
        this.setState({
          deletingInProgress: false,              // disable loading indicator 
          deletingError: e                        // show error message
        })
      );
  
      // set loading to true
      this.setState({
        deletingInProgress: true,                 // show loading indicator
        deletingError: null                       // disable error message
      });
    }

    handleAvatarButtonClick = () => {
        this.setState({
          open: !this.state.open
        });
      }
    
    openDeleteDialog = () => {
      this.setState({
        deleteDialog: true
      });
    }

    closeDeleteDialog = () => {
      this.setState({
        deleteDialog: false
      });
    }
    
      /** 
       * Handles click events from the ClickAwayListener.
       * 
       * @see See Material-UIs [ClickAwayListener](https://material-ui.com/components/click-away-listener/)
       */
      handleClose = () => {
        this.setState({
          open: false
        });
      }
    
      /** 
         * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
         * 
         * @see See Google [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
         * @see See Google [firebase.auth().signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout)
         */
      handleSignOutButtonClicked = () => {
        firebase.initializeApp(firebasConfig)
        firebase.auth().signOut();
      }
    

    render() {
        const { user, dbuser} = this.props;
        const { open, deleteDialog, deletingError, deletingInProgress } = this.state;
    
        return (
          user ?
            <div>
              <IconButton  ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
                <Avatar src={user.photoURL} />
              </IconButton>
              <Popover open={open} anchorEl={this.#avatarButtonRef.current} onClose={this.handleClose}
                anchorOrigin={{
                  vertical: this.props.Avertical,
                  horizontal: this.props.Ahorizontol,
                }}
                transformOrigin={{
                  vertical: this.props.Tvertical,
                  horizontal: this.props.Thorizontol,
                }}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Paper >
                    <Typography align='center'>Wilkommen!</Typography>
                    <Divider  />
                    <Typography align='center' variant='body2'>{user.displayName}</Typography>
                    <Typography align='center' variant='body2'>{user.email}</Typography>
                    <Divider  />
                    <Grid container justifyContent='center'>
                      <Grid item>
                      <Link class="ProfileBtn" to='/MeinProfil'>
                          <Button color='primary' startIcon={<AccountCircleIcon/>}>Profile</Button>
                      </Link>
                      </Grid>
                    </Grid>
                    <Divider  />
                    <Grid container justifyContent='center'>
                      <Grid item>
                      <Button color='error' startIcon={<LogoutIcon/>}onClick={this.handleSignOutButtonClicked}>Logout</Button>
                      </Grid>
                    </Grid>   
                    <Grid container justifyContent='center'>
                      <Grid item>
                      <Button color='error' startIcon={<PersonRemoveIcon/>}onClick={this.openDeleteDialog}>Profil Löschen</Button>
                      </Grid>
                    </Grid>                
                  </Paper>
                </ClickAwayListener>
              </Popover>
              {deleteDialog?
              <Dialog open={deleteDialog}>
                {console.log("delete", deleteDialog)}
                <DialogTitle id='delete-dialog-title'>Profil löschen                 
                {console.log("user.id?", this.props.dbuser)}

            <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.closeDeleteDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Möchtest du wirklich dein Profil löschen?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`Dein Profil konnte nicht gelöscht werden.`}
              onReload={this.deleteUser} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDeleteDialog} color='secondary'>
              Abbrechen
            </Button>
            <Button variant='contained' onClick={this.deleteProfile} color='primary'>
              Löschen
            </Button>
          </DialogActions>
              </Dialog>
    :null}
            </div>
            :null
        )
        
      }
    }
    

ProfileDropDown.propTypes = {
    user: PropTypes.object,
    Ahorizontol: PropTypes.string,
    Avertical: PropTypes.string,
    Thorizontol: PropTypes.string,
    Tvertical: PropTypes.string,
    dbuser: PropTypes.any

}


export default ProfileDropDown