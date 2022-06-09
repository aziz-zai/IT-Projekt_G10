import React, { Component } from 'react';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



export class ProjektarbeitenSelection extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      projektarbeit: ''
    };
  }

  componentDidMount() {
 
  }

  /** gets the balance for this account */


  handleChange = (event) => {
    this.setState({
      projektarbeit: event.target.value
    })
	}


  render() {
    const {Cuser, user} = this.props;
    const {projektarbeit} = this.state;
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Projektarbeit
        </InputLabel>
        <NativeSelect
          defaultValue={projektarbeit}
          inputProps={{
            name: 'projektarbeiten',
            id: 'uncontrolled-native',
          }}
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

ProjektarbeitenSelection.propTypes = {
}

export default ProjektarbeitenSelection
