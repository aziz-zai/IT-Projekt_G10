import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Ereignisbuchung.css'
import OneAPI from '../../api/OneAPI';
import EreignisbuchungListEntry from './EreignisbuchungListEntry'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export class Ereignisbuchung extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
        ereignisbuchungen: [],
        ereignisbuchungenSoll: [],
        deletedIstTrue: false,
        deletedSollTrue: false
    };
  }
  getEreignisbuchungIST = () => {
    OneAPI.getAPI().getEreignisbuchungIST(this.props.user[0].id, this.props.startFilter, this.props.endFilter).then(ereignisbuchungen =>
      this.setState({
        ereignisbuchungen: ereignisbuchungen,
    
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }

  getEreignisbuchungSOLL = () => {
    OneAPI.getAPI().getEreignisbuchungSOLL(this.props.user[0].id, this.props.startFilter, this.props.endFilter).then(ereignisbuchungen =>
      this.setState({
        ereignisbuchungenSoll: ereignisbuchungen,
    
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }

  EreignisbuchungIstDeleted = (deletedBuchung) => {
    this.setState({
      ereignisbuchungen: this.state.ereignisbuchungen.filter(buchung => buchung.id != deletedBuchung.id),
      deletedIstTrue: true
    })
  }
  EreignisbuchungSollDeleted = (deletedBuchung) => {
    this.setState({
      ereignisbuchungenSoll: this.state.ereignisbuchungenSoll.filter(buchung => buchung.id != deletedBuchung.id),
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
this.getEreignisbuchungIST()
this.getEreignisbuchungSOLL()
}
  render() {
      const {istBuchung} = this.props;
      const {ereignisbuchungen, ereignisbuchungenSoll, deletedSollTrue, deletedIstTrue} = this.state;
    return (
      <div>
        {istBuchung ?
        <div>
          <button onClick={this.getEreignisbuchungIST} class="filterBtn">Suche</button>
          <div class="buchungDeleted" >
                     {deletedIstTrue ?
              <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert onClose={this.handleDeletedIstClose}>Buchung erfolgreich gelöscht!</Alert>
              </Stack>:null}</div>
            {ereignisbuchungen ?
            ereignisbuchungen.map(ereignisbuchung => <EreignisbuchungListEntry key={ereignisbuchung.getID()} ereignisbuchung={ereignisbuchung} istBuchung={true} ereignisbuchungIstDeleted={this.EreignisbuchungIstDeleted}/>):null}
        </div>
        : <div>
          <button onClick={this.getEreignisbuchungSOLL} class="filterBtn">Suche</button>
          <div class="buchungDeleted" >
                     {deletedSollTrue ?
              <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert onClose={this.handleDeletedSollClose}>Buchung erfolgreich gelöscht!</Alert>
              </Stack>:null}</div>
            {ereignisbuchungenSoll ?
            ereignisbuchungenSoll.map(ereignisbuchung => <EreignisbuchungListEntry key={ereignisbuchung.getID()} ereignisbuchung={ereignisbuchung} istBuchung={true} ereignisbuchungSollDeleted={this.EreignisbuchungIstDeleted}/> ):null}
          </div>}
      </div>
    )
  }
}

Ereignisbuchung.propTypes = {
    istBuchung: PropTypes.any,
    startFilter: PropTypes.any,
    endFilter: PropTypes.any,
    user: PropTypes.any,
  }
export default Ereignisbuchung