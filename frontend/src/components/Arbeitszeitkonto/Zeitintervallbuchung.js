import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Zeitintervallbuchung.css'
import OneAPI from '../../api/OneAPI';
export class Zeitintervallbuchung extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
   
    };
  }

  getZeitintervallbuchungIst = () => {
    OneAPI.getAPI().getUserGid(this.props.Cuser.uid).then(user =>
      this.setState({
        upUser: user,
        firstName: user[0].vorname,
        lastName: user[0].nachname,
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          upUser: null,
        })
      );
    // set loading to true
    this.setState({
  
    });
  }

  render() {
      const {istBuchung} = this.props;
    return (
      <div >
          {istBuchung  ?
          <div>ist buchung zeitintervall</div>: <div>soll buchung zeitintervall</div>}
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