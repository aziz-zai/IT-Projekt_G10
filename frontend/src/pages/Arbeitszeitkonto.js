import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OneAPI from '../api/OneAPI'
import './Arbeitszeitkonto.css'

export class Arbeitszeitkonto extends Component {

    constructor(props) {
        super(props);
    this.state = {
      arbeitszeitKonto: null
    };
  }


  loadArbeitszeitkonto = () => {
    OneAPI.getAPI().getArbeitszeitkonto(this.props.user[0].id).then(arbeitszeitKonto =>
      this.setState({
        arbeitszeitKonto: arbeitszeitKonto,
      }),
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          arbeitszeitKonto: null,
        })
      );
    // set loading to true
    this.setState({
    });
  }
componentDidMount(){
  this.loadArbeitszeitkonto();
}
  render() {
    const {arbeitszeitKonto} = this.state;
    return (
      <div>
        {arbeitszeitKonto ? 
        <div class="arbeitszeitKontoHeader">
        <div class="azkHeaderItem">Arbeitsleistung: <strong>{arbeitszeitKonto[0].arbeitsleistung} </strong>Stunden</div>
       <div class="azkHeaderItem">Urlaubskonto: <strong>{arbeitszeitKonto[0].urlaubskonto} </strong>Tage</div>
       <div class="azkHeaderItem">Gleitzeit: <strong>{arbeitszeitKonto[0].gleitzeit}</strong> Stunden</div>
       </div>:null}
       
      </div>
    )
  }
}

Arbeitszeitkonto.propTypes = {
    user: PropTypes.any,
  }
export default Arbeitszeitkonto