import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button, IconButton, TextField, FormControl, InputLabel, NativeSelect} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import OneAPI from '../../api/OneAPI';
import KommenBO from '../../api/KommenBO';
import GehenBO from '../../api/GehenBO';

class CreateProjektarbeit extends Component {
    constructor(props) {
        super(props);
    
        // Init state
        this.state = {
            projektarbeitAnfang:null,
            projektarbeitEnde:null,
            memberList: [],
            erstelltFuer: 0,
            projektArbeitBezeichnung: "",
            success: false
        };
      }

      handleDialogCLose = () => {
          this.props.handleClose()
      }

      getMembersByProject = () => {
        OneAPI.getAPI().getMembersByProject(this.props.project.id).then(membership =>
          this.setState({
            memberList: membership,
            loadingInProgress: false, // loading indicator 
            loadingError: null
          })).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
          )
          this.setState({
            loadingInProgress: true,
            loadingError: null
          });
        };
      addKommenSoll = () => {
          let newKommen = new KommenBO(this.state.projektarbeitAnfang, "Arbeitsbeginn")
          console.log('newkommen', newKommen)
        OneAPI.getAPI().addKommenSoll(newKommen, this.props.user, this.state.erstelltFuer).then(kommen =>{
          this.setState({
            kommen: kommen,
            loadingInProgress: false, // loading indicator 
            loadingError: null
          })
          return kommen
        }).then(kommen =>
            this.addGehenSoll(kommen)
        ).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
          )
          this.setState({
            loadingInProgress: true,
            loadingError: null
          });
        };

      addGehenSoll = (kommen) => {
          let newGehen = new GehenBO(this.state.projektarbeitEnde, "Arbeitsende")
          console.log('gehen', newGehen, kommen.id, this.props.user, this.state.erstelltFuer, this.props.activity, this.state.projektArbeitBezeichnung)
        OneAPI.getAPI().addGehenSoll(newGehen, kommen.id, this.props.user, this.state.erstelltFuer, this.props.activity, this.state.projektArbeitBezeichnung ).then(gehen =>
          this.setState({
            loadingInProgress: false, // loading indicator 
            loadingError: null,
            projektarbeitAnfang:null,
            projektarbeitEnde:null,
            erstelltFuer: null,
            projektArbeitBezeichnung: "",
            success: true
          })).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
          )
          this.setState({
            loadingInProgress: true,
            loadingError: null
          });
        };

      dateFilterChanged = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
      }
      handleChange = (event) => {
        this.setState({
          erstelltFuer: event.target.value
        })
    }

    textFieldValueChange = (event) => {
        this.setState({
          projektArbeitBezeichnung: event.target.value,
        });
      }

      handleClose = () => {
        this.setState({
          success: false
        })
      }

      componentDidMount() {
          this.getMembersByProject()
      }
      
    render() {
        const {show} = this.props; 
        const {projektarbeitAnfang, projektarbeitEnde, memberList, projektArbeitBezeichnung, erstelltFuer, success} = this.state; 
        return (
            <Dialog
        open={show}
        onClose={this.handleDialogCLose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id='form-dialog-title'>Projektarbeit erstellen
    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleDialogCLose}>
       <CloseIcon />
    </IconButton></DialogTitle>
    {success ?
              <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert onClose={this.handleClose}>Profil Daten erfolgreich gespeichert!</Alert>
              </Stack>:null}
        <DialogContent>
        <DialogContentText id="alert-dialog-erstelltfürinput">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Für
        </InputLabel>{console.log('erstellt', erstelltFuer)}
        <NativeSelect
          defaultValue={erstelltFuer}
          inputProps={{
            name: 'Für',
            id: 'uncontrolled-native',
          }}
          onChange={this.handleChange}
        >
            <option value={0}></option>
           {memberList ?
          memberList.map((member, index) => <option value={member.id}>{member.vorname}</option>)
          :null}
        </NativeSelect>
      </FormControl>
        </DialogContentText>
          <DialogContentText id="alert-dialog-timeinput">
          <TextField
        id="projektarbeitAnfang"
        label="Von"
        type="datetime-local"
        value={projektarbeitAnfang}
        onChange={this.dateFilterChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      />&nbsp;<TextField
      id="projektarbeitEnde"
      label="Bis"
      type="datetime-local"
      value={projektarbeitEnde}
      onChange={this.dateFilterChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
          </DialogContentText> <br/>
          <DialogContentText id="alert-dialog-bezeichnungInput">
          <TextField
          color="secondary"
          id="outlined-textarea"
          label="Bezeichnung"
          value={projektArbeitBezeichnung}
          onChange={this.textFieldValueChange}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.addKommenSoll} autoFocus>
            Projektarbeit erstellen
          </Button>
        </DialogActions>
      </Dialog>
        );
    }
}

CreateProjektarbeit.propTypes = {
    show: PropTypes.any,
    handleClose: PropTypes.any,
    project: PropTypes.any,
    user: PropTypes.any,
    activity: PropTypes.any,
};

export default CreateProjektarbeit;