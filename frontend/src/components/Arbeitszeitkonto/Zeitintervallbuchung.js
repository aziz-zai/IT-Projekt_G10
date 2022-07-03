import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Zeitintervallbuchung.css'
import OneAPI from '../../api/OneAPI';
import ZeitintervallbuchungListEntry from './ZeitintervallbuchungListEntry'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
export class Zeitintervallbuchung extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
      zeitintervallbuchungIst:[],
      zeitintervallbuchungSoll: [],
      deletedIstTrue: false,
      deletedSollTrue: false,
    };
  }

  getZeitintervallbuchungIst = () => {
    OneAPI.getAPI().getZeitintervallbuchungIst(this.props.user[0].id, this.props.startFilter, this.props.endFilter).then(buchungen =>
      this.setState({
        zeitintervallbuchungIst: buchungen,
    
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }

  getZeitintervallbuchungSoll = () => {
    OneAPI.getAPI().getZeitintervallbuchungSoll(this.props.user[0].id, this.props.startFilter, this.props.endFilter).then(buchungen =>
      this.setState({
        zeitintervallbuchungSoll: buchungen,
    
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }

  ZeitintervallbuchungIstDeleted = (deletedBuchung) => {
    this.setState({
      zeitintervallbuchungIst: this.state.zeitintervallbuchungIst.filter(buchung => buchung.id != deletedBuchung.id),
      deletedIstTrue: true
    })
  }
  ZeitintervallbuchungSollDeleted = (deletedBuchung) => {
    this.setState({
      zeitintervallbuchungSoll: this.state.zeitintervallbuchungSoll.filter(buchung => buchung.id != deletedBuchung.id),
      deletedSollTrue: true
    })
  }

  handleDeletedIstClose = () => {
    this.setState({
      deletedIstTrue: false
    })
  }
  handleDeletedSollClose = () => {
    this.setState({
      deletedSollTrue: false
    })
  }


componentDidMount() {
this.getZeitintervallbuchungIst()
this.getZeitintervallbuchungSoll()
}

  render() {
      const {istBuchung} = this.props;
      const {zeitintervallbuchungIst, zeitintervallbuchungSoll, deletedSollTrue, deletedIstTrue} = this.state;
      var IstZeitdifferenz = null
      zeitintervallbuchungIst.map(buchung => IstZeitdifferenz += parseFloat(buchung.zeitdifferenz)) 
      var sollZeitdifferenz = null
      zeitintervallbuchungSoll.map(buchung => sollZeitdifferenz += parseFloat(buchung.zeitdifferenz)) 
    return (
      <div >{console.log('newSoll', zeitintervallbuchungSoll)}
          {istBuchung ?
        <div>
          <div>
          <button onClick={this.getZeitintervallbuchungIst} class="filterBtn">Suche</button>
          {IstZeitdifferenz ? <div class="gesamt"> Gesamtstunden IST: <strong>{IstZeitdifferenz.toFixed(2)}h</strong></div>:null}</div>
          <div class="buchungDeleted">
                     {deletedIstTrue ?
              <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert onClose={this.handleDeletedIstClose}>Buchung erfolgreich gelöscht!</Alert>
              </Stack>:null}</div>
            {zeitintervallbuchungIst ?
            zeitintervallbuchungIst.map(buchung => <ZeitintervallbuchungListEntry key={buchung.getID()} buchung={buchung} istBuchung={true} handleZeitintervallbuchungIstDeleted={this.ZeitintervallbuchungIstDeleted} />):null}
        </div>
        : <div>
          <div>
          <button onClick={this.getZeitintervallbuchungSoll} class="filterBtn">Suche</button>
          {sollZeitdifferenz ? <div class="gesamt"> Gesamtstunden SOLL: <strong>{sollZeitdifferenz.toFixed(2)}h</strong></div>:null}</div>
          <div class="buchungDeleted" >
                     {deletedSollTrue ?
              <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert onClose={this.handleDeletedSollClose}>Buchung erfolgreich gelöscht!</Alert>
              </Stack>:null}</div>
            {zeitintervallbuchungSoll ?
            zeitintervallbuchungSoll.map(buchung => <ZeitintervallbuchungListEntry key={buchung.getID()} buchung={buchung} istBuchung={false} handleZeitintervallbuchungSollDeleted={this.ZeitintervallbuchungSollDeleted} />):null}
          </div>}
      </div>
    )
  }
}

Zeitintervallbuchung.propTypes = {
    istBuchung: PropTypes.any,
    startFilter: PropTypes.any,
    endFilter: PropTypes.any,
    user: PropTypes.any,
  }
export default Zeitintervallbuchung