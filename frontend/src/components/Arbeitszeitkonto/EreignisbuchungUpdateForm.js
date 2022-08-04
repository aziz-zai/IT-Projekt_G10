import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import EreignisBO from '../../api/EreignisBO';
import OneAPI from '../../api/OneAPI';
import EreignisbuchungBO from '../../api/EreignisbuchungBO';
import KommenBO from '../../api/KommenBO';
import GehenBO from '../../api/GehenBO';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';


export class EreignisbuchungUpdateForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         loading: false,
         ereignisTime: "",
         ereignisBezeichnung: "",
      }
    }

    handleFormClosed = () => {
        this.props.onClose()
    }

    componentDidMount = () => {
        this.setState({
          loading: true
        })
        setTimeout(() => {
          let ez = "", eb=""
          if(this.props.ereignis){
            ez = this.props.ereignis.zeitpunkt
            eb = this.props.ereignis.bezeichnung
          }
        this.setState({
        ereignisTime: ez,
        ereignisBezeichnung: eb,
        loading: false
        })
        }, 3000);
      }

      dateFilterChanged = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
      }

      updateGehen = () => {
        let newGehen = Object.assign(new GehenBO(), this.props.ereignis);
        newGehen.setZeitpunkt(this.state.ereignisTime)
        OneAPI.getAPI().updateGehen(newGehen, this.props.ereignis.id).then(gehen =>
          this.props.saveGehen(gehen)
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
      
            }),
          );
        // set loading to true
        this.setState({
      
        });
      }
      updateKommen = () => {
        let newKommen = Object.assign(new KommenBO(), this.props.ereignis);
        newKommen.setZeitpunkt(this.state.ereignisTime)
        OneAPI.getAPI().updateKommen(newKommen, this.props.ereignis.id).then(kommen =>
          this.props.saveKommen(kommen)
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
      
            }),
          );
        // set loading to true
        this.setState({
      
        });
      }
      updateEreignis = () => {
        let newEreignis = Object.assign(new EreignisBO(), this.props.ereignis);
        newEreignis.setZeitpunkt(this.state.ereignisTime)
        OneAPI.getAPI().updateEreignis(newEreignis, this.props.ereignis.id).then(ereignis =>
          this.props.saveEreignis(ereignis)
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
      
            }),
          );
        // set loading to true
        this.setState({
      
        });
      }
      handleEreignisUpdate = () => {
        if (this.props.buchung.bezeichnung == "Arbeitsbeginn") {
            this.updateKommen();
          } else if (this.props.buchung.bezeichnung == "Arbeitsende") {
            this.updateGehen();
          } else {
            this.updateEreignis();
          }
      }
  render() {
      const { show } = this.props;
      const { ereignisTime } = this.state
    return (
        show ?
        <Dialog
        open={show}
        onClose={this.handleFormClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       <DialogTitle id='form-dialog-title'>Ereignisbuchung bearbeiten
    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleFormClosed}>
       <CloseIcon />
    </IconButton></DialogTitle><br/>
    {this.state.loading ?
    <CircularProgress sx={{maring: "auto"}}/>:
        <DialogContent>  
          <DialogContentText id="alert-dialog-times">
          <TextField
      color="secondary"
      id="ereignisTime"
      label="Beginn"
      type="datetime-local"
      value={ereignisTime ? ereignisTime:this.props.ereignis.zeitpunkt }
      onChange={this.dateFilterChanged}
      sx={{ width: 200, marginTop:2 }}
      InputLabelProps={{
        shrink: true,
      }}
    /> &nbsp;&nbsp;
        </DialogContentText><br/><br/>
        </DialogContent>}
        <DialogActions>
          <Button onClick={this.handleEreignisUpdate} autoFocus>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>:null
    )
  }
}

EreignisbuchungUpdateForm.propTypes = {
    show: PropTypes.any,
    onClose: PropTypes.any,
    ereignis: PropTypes.any,
    buchung: PropTypes.any,
    saveKommen: PropTypes.any,
    saveGehen: PropTypes.any,
    saveEreignis1: PropTypes.any,
    saveBuchung: PropTypes.any
   }

export default EreignisbuchungUpdateForm