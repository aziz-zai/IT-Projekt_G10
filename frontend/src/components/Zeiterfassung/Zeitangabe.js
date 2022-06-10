import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Zeitangabe.css'



export class Zeitangabe extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
        stunden: 0,
        minuten: 0,
        sekunden: 0
    };
  }

  componentDidMount() {
    const update = () => {
        const date = new Date();
        this.setState({
            stunden: date.getHours(),
            minuten: date.getMinutes(),
            sekunden: date.getSeconds()
        })
    }

    update();

    const interval = setInterval(()=> {
        update();
    }, 1000);

    return ()=>clearInterval(interval);
  }


  render() {
    const {kommenClicked} = this.props;
    const {stunden, minuten, sekunden} = this.state;
    return (
        <div class="BtnContainer">
        {String(stunden).padStart(2, "0")}:{String(minuten).padStart(2, "0")}:{String(sekunden).padStart(2, "0")}{console.log('kommen', kommenClicked)}
    </div>
    )
  }
}

Zeitangabe.propTypes = {
  handleSelection: PropTypes.any,
  kommenClicked: PropTypes.any
}

export default Zeitangabe
