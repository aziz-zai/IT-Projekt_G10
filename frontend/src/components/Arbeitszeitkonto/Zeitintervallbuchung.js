import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Zeitintervallbuchung.css'
import OneAPI from '../../api/OneAPI';
import ZeitintervallbuchungListEntry from './ZeitintervallbuchungListEntry'
export class Zeitintervallbuchung extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
      zeitintervallbuchungIst:[],
      zeitintervallbuchungSoll: []
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

componentDidMount() {
this.getZeitintervallbuchungIst()
this.getZeitintervallbuchungSoll()
}

  render() {
      const {istBuchung} = this.props;
      const {zeitintervallbuchungIst, zeitintervallbuchungSoll} = this.state;
    return (
      <div >
          {istBuchung ?
        <div>
          <button onClick={this.getZeitintervallbuchungIst} class="filterBtn">Suche</button>
            {zeitintervallbuchungIst ?
            zeitintervallbuchungIst.map(buchung => <ZeitintervallbuchungListEntry key={buchung.getID()} buchung={buchung}/>):null}
        </div>
        : <div>
          <button onClick={this.getZeitintervallbuchungSoll} class="filterBtn">Suche</button>
            {zeitintervallbuchungSoll ?
            zeitintervallbuchungSoll.map(buchung => <ZeitintervallbuchungListEntry key={buchung.getID()} buchung={buchung}/>):null}
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