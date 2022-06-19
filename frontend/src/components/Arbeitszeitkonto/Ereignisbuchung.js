import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Ereignisbuchung.css'
import OneAPI from '../../api/OneAPI';
import EreignisbuchungListEntry from './EreignisbuchungListEntry'

export class Ereignisbuchung extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
        ereignisbuchungen: [],
        ereignisbuchungenSoll: []
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

componentDidMount() {
this.getEreignisbuchungIST()
this.getEreignisbuchungSOLL()
}
  render() {
      const {istBuchung} = this.props;
      const {ereignisbuchungen, ereignisbuchungenSoll} = this.state;
    return (
      <div>
        {istBuchung ?
        <div>
          <button onClick={this.getEreignisbuchungIST} class="filterBtn">Suche</button>
            {ereignisbuchungen ?
            ereignisbuchungen.map(ereignisbuchung => <EreignisbuchungListEntry key={ereignisbuchung.getID()} ereignisbuchung={ereignisbuchung}/>):null}
        </div>
        : <div>
          <button onClick={this.getEreignisbuchungSOLL} class="filterBtn">Suche</button>
            {ereignisbuchungenSoll ?
            ereignisbuchungenSoll.map(ereignisbuchung => <EreignisbuchungListEntry key={ereignisbuchung.getID()} ereignisbuchung={ereignisbuchung}/>):null}
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