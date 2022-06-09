import React, { Component } from 'react';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import OneAPI from '../../api/OneAPI';



export class ProjektarbeitenSelection extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      selectedProjektarbeit: '',
      projektarbeiten: []
    };
  }

  componentDidMount() {
    this.loadProjektarbeiten()
  }

  /** gets the balance for this account */

  loadProjektarbeiten = () => {
    OneAPI.getAPI().getProjektarbeitByActivity(this.props.aktivität).then(projektarbeiten =>
      this.setState({
        projektarbeiten: projektarbeiten,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  handleChange = (event) => {
    this.setState({
      selectedProjektarbeit: event.target.value
    })
	}


  render() {
    const {Cuser, user} = this.props;
    const {projektarbeiten} = this.state;
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Projektarbeit
        </InputLabel>
        <NativeSelect
          defaultValue={0}
          inputProps={{
            name: 'projektarbeiten',
            id: 'uncontrolled-native',
          }}
        >
          <option value={0}></option>
           {projektarbeiten ?
          projektarbeiten.map((projektarbeit, index) => <option value={projektarbeit.id}>{projektarbeit.bezeichnung}</option>)
          :null}
        </NativeSelect>{console.log('acti', this.props.aktivität)}
      </FormControl>
        </div>
    </div>
    )
  }
}

ProjektarbeitenSelection.propTypes = {
  aktivität: PropTypes.any
}

export default ProjektarbeitenSelection
