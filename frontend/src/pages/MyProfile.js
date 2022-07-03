import React, { Component } from "react";
import OneAPI from "../api/OneAPI";
import UserBO from "../api/UserBO";
import PropTypes from "prop-types";
import "./MyProfile.css";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export class MyProfile extends Component {
  constructor(props) {
    super(props);
    // Init state
    let fn = "",
      ln = "";
    if (props.user) {
      fn = props.user[0].vorname;
      ln = props.user[0].nachname;
    }

    this.state = {
      firstName: "",
      lastName: "",
      success: false,
      vertical: "bottom",
      horizontal: "left",
      loading: false,
    };
  }

  updateUser = () => {
    // clone the original user, in case the backend call fails
    let updatedUser = Object.assign(new UserBO(), this.props.user[0]);
    this.setState({
      success: true, // no error message
    });
    // set the new attributes from our dialog
    updatedUser.setVorname(this.state.firstName);
    updatedUser.setNachname(this.state.lastName);
    OneAPI.getAPI()
      .updateUser(updatedUser)
      .then((user) => {
        this.setState({
          success: true, // no error message
        });
        // keep the new state as base state
        this.baseState.firstName = this.state.firstName;
        this.baseState.lastName = this.state.lastName; // call the parent with the new User
      })
      .catch((e) =>
        this.setState({
          // show error message
        })
      );
    // set loading to true
    this.setState({
      // disable error message
    });
  };
  getUserbygid = () => {
    OneAPI.getAPI()
      .getUserGid(this.props.Cuser.uid)
      .then((user) => {
        this.setState({
          firstName: user[0].vorname,
          lastName: user[0].nachname,
          loading: false,
        });
        if (user[0].vorname === "") {
          this.setState({
            message: true,
          });
        }
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({
      loading: true,
    });
  };

  handleClose = () => {
    this.setState({
      success: false,
    });
  };

  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleMessageCLose = () => {
    this.setState({
      message: false,
    });
  };
  componentDidMount() {
    this.getUserbygid();
  }

  render() {
    const { user, Cuser } = this.props;
    const { firstName, lastName, success, loading, message } = this.state;
    return (
      <div>
        {user ? (
          <div class="ProfileWrapper">
            <div class="ProfileContainer">
              <div>
                <img
                  class="ProfileAvatar"
                  src={Cuser.photoURL}
                  alt="No Profilephoto"
                />
              </div>
              <div class="ProfileContent">
                <div>
                  <TextField
                    color="secondary"
                    type="text"
                    required
                    id="firstName"
                    label="Vorname"
                    value={firstName}
                    onChange={this.textFieldValueChange}
                  />
                </div>{" "}
                &nbsp;{" "}
                <div>
                  <TextField
                    color="secondary"
                    type="text"
                    required
                    id="lastName"
                    label="Nachname"
                    value={lastName}
                    onChange={this.textFieldValueChange}
                  />
                </div>
              </div>
              <div class="success">
                {success ? (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert onClose={this.handleClose}>
                      Profil Daten erfolgreich gespeichert!
                    </Alert>
                  </Stack>
                ) : null}
                {loading ? <CircularProgress /> : null}
              </div>
              <div class="saveBtnWrapper">
                <button onClick={this.updateUser} class="saveBtn">
                  Speichern
                </button>
              </div>
              {message ? (
                <Dialog
                  open={message}
                  onClose={this.handleMessageCLose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Profil unvollständig
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Bevor Sie fortfahren tragen Sie bitte ihren Vor- und
                      Nachnamen ein.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleMessageCLose} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

MyProfile.propTypes = {
  user: PropTypes.any,
  Cuser: PropTypes.any,
};

export default MyProfile;
