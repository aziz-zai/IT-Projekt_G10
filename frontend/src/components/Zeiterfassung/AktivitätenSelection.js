import React, { Component } from 'react';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



export class AktivitätenSelection extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      aktivität: '',
    };
  }

  componentDidMount() {
 
  }

  /** gets the balance for this account */


  handleChange = (event) => {
    this.setState({
      aktivität: event.target.value
    })
    setTimeout(() => {
        if(this.state.aktivität){
      this.props.handleSelection(this.state.aktivität);
    }}, 300);
	}


  render() {
    const {} = this.props;
    const {aktivität} = this.state;
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Aktivität
        </InputLabel>
        <NativeSelect
          defaultValue={aktivität}
          inputProps={{
            name: 'aktivitäten',
            id: 'uncontrolled-native',
          }}
          onChange={this.handleChange}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
        </div>
    </div>
    )
  }
}

AktivitätenSelection.propTypes = {
    handleSelection: PropTypes.any
}

export default AktivitätenSelection
