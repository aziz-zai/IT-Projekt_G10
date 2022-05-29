import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import firebase from 'firebase/compat/app';
import firebasConfig from '../../firebaseconfig'
import {Link} from 'react-router-dom'
export class ProfileDropDown extends Component {
    #avatarButtonRef = createRef();
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleAvatarButtonClick = () => {
        this.setState({
          open: !this.state.open
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
        const { classes, user } = this.props;
        const { open } = this.state;
    
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
                        <Button color='primary' onClick={this.handleSignOutButtonClicked}>Logout</Button>
                      </Grid>
                      <Grid item>
                        <Link color='primary' to='/MyProfile'>Mein Profil</Link>
                      </Grid>
                    </Grid>
                  </Paper>
                </ClickAwayListener>
              </Popover>
            </div>
            : null
        )
        
      }
    }
    

ProfileDropDown.propTypes = {
    user: PropTypes.object,
    Ahorizontol: PropTypes.string,
    Avertical: PropTypes.string,
    Thorizontol: PropTypes.string,
    Tvertical: PropTypes.string,

}


export default ProfileDropDown