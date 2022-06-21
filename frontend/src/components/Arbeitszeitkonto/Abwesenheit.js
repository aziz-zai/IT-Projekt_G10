import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import OneAPI from '../../api/OneAPI';
import EreignisBO from '../../api/EreignisBO'

export class Abwesenheit extends Component {
 // Init state
 constructor(props) {
    super(props);
this.state = {
    abwesenheitsart:"Urlaub",
    abwesenheitsZeit1:null,
    abwesenheitsZeit2:null,
    abwesenheitOhneEnde: false,
};
}

handleFormClosed = () => {
    this.props.onClose();
}

handleChange = (event) => {
    this.setState({
        abwesenheitsart: event.target.value
    })
}

abwesenheitZeitChanged = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleAbwesenheitOhneEndeChecked = () => {
      if(this.state.abwesenheitOhneEnde){
      this.setState({
          abwesenheitOhneEnde: false,
          abwesenheitsart: "Krankheitsausfall"
      })}
      else{
        this.setState({
            abwesenheitOhneEnde: true,
            abwesenheitsart: "Krankheitsausfall ohne Ende"
        })
      }
  }

  addAbwesenheitsEnde = (ereignis) => {
    let zeitpunkt = ((this.state.abwesenheitsart == 'Gleitzeit') ? (this.state.abwesenheitsZeit2):(this.state.abwesenheitsZeit2 + "T23:59"))
    let newAbwesenheitEnde = new EreignisBO(zeitpunkt, this.state.abwesenheitsart) 
    OneAPI.getAPI().addAbwesenheitEnde(newAbwesenheitEnde, ereignis.id, this.props.user[0].id, this.state.abwesenheitsart).then(ereignis =>
      this.props.onClose()
      ).catch(e =>
        this.setState({ // Reset state with error from catch 

        }),
        console.log('sadsad')
      );
    // set loading to true
    this.setState({

    });
  }
  addAbwesenheitsBeginn = () => {
    let zeitpunkt = ((this.state.abwesenheitsart == 'Gleitzeit') ? (this.state.abwesenheitsZeit1):(this.state.abwesenheitsZeit1 + "T00:00"))
    let newAbwesenheitBeginn = new EreignisBO(zeitpunkt, this.state.abwesenheitsart) 
    OneAPI.getAPI().addAbwesenheitBeginn(newAbwesenheitBeginn, this.props.user[0].id, this.state.abwesenheitsart).then(ereignis =>{
        if(!this.state.abwesenheitOhneEnde){
            this.addAbwesenheitsEnde(ereignis)
        }
        else{
            this.props.onClose()
        }
    }    
    ).catch(e =>
        this.setState({ // Reset state with error from catch 

        })
      );
    // set loading to true
    this.setState({

    });
  }

  


  render() {
      const {show, user} = this.props;
      const {abwesenheitsart, abwesenheitsZeit1, abwesenheitsZeit2} = this.state;
    return (
        show ?
        <Dialog
        open={show}
        onClose={this.handleFormClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      > {console.log('check', this.state.abwesenheitOhneEnde)}
        <DialogTitle id="alert-dialog-title">
          Abwesenheit erfassen
        </DialogTitle>
        <DialogContent>
            <DialogContentText>Abwesenheitsart wählen:</DialogContentText>
          <DialogContentText id="alert-dialog-description">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Aktvität
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: 'Abwesenheitsart',
            id: 'uncontrolled-native',
          }}
          onChange={this.handleChange}
        >
         <option value="Urlaub">Urlaub</option>
         <option value="Krankheitsausfall">Krankheitsausfall</option>
         <option value="Gleitzeit">Gleitzeit</option>
        </NativeSelect>
      </FormControl>
          </DialogContentText><br/><br/>
          <DialogContentText>
              {(abwesenheitsart == 'Gleitzeit') ?
          <div><TextField
        id="abwesenheitsZeit1"
        label="Von"
        type="datetime-local"
        value={abwesenheitsZeit1}
        onChange={this.abwesenheitZeitChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> <TextField
      id="abwesenheitsZeit2"
      label="Bis"
      type="datetime-local"
      value={abwesenheitsZeit2}
      onChange={this.abwesenheitZeitChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    /></div>:
    <div><TextField
        id="abwesenheitsZeit1"
        label="Von"
        type="date"
        value={abwesenheitsZeit1}
        onChange={this.abwesenheitZeitChanged}
        sx={{ width: 200, marginTop:2 }}
        InputLabelProps={{
          shrink: true,
        }}
      /> <TextField
      id="abwesenheitsZeit2"
      label="Bis"
      type="date"
      value={abwesenheitsZeit2}
      onChange={this.abwesenheitZeitChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    /></div>}
    {(abwesenheitsart == 'Krankheitsausfall') ?
    <FormControlLabel sx={{marginLeft: 1, marginTop: 1}}control={<Checkbox onChange={this.handleAbwesenheitOhneEndeChecked}/>} label="Abwesenheit ohne Ende erfassen" />:
    (abwesenheitsart == 'Krankheitsausfall ohne Ende') ?
    <FormControlLabel sx={{marginLeft: 1, marginTop: 1}}control={<Checkbox onChange={this.handleAbwesenheitOhneEndeChecked}/>} label="Abwesenheit ohne Ende erfassen" />:null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.addAbwesenheitsBeginn} autoFocus>
            Abschicken
          </Button>
        </DialogActions>
      </Dialog>:null
    )
  }
}

Abwesenheit.propTypes = {
   show: PropTypes.any,
   onClose: PropTypes.any,
   user: PropTypes.any,
  }
export default Abwesenheit