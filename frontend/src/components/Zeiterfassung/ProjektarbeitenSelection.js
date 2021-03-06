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
    OneAPI.getAPI().getProjektarbeitByActivity(this.props.aktivität, this.props.user[0].id).then(projektarbeiten =>
      this.setState({
        projektarbeiten: projektarbeiten.map(projektarbeit => {return projektarbeit.bezeichnung}),
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
    });
    setTimeout(() => {
      if(this.state.selectedProjektarbeit){
    this.props.handleSelection(this.state.selectedProjektarbeit);
  }}, 300);
	}


  render() {
    const {Cuser, user} = this.props;
    const {projektarbeiten} = this.state;
    var uniqProjektarbeiten = projektarbeiten.filter(function (value, index, array) { 
      return array.indexOf(value) === index;
    });
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}> {console.log('test', user)}
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Projektarbeit
        </InputLabel>
        <NativeSelect
          defaultValue={0}
          inputProps={{
            name: 'projektarbeiten',
            id: 'uncontrolled-native',
          }}
          onChange={this.handleChange}
        >
          <option value={0}></option>
           {uniqProjektarbeiten ?
          uniqProjektarbeiten.map((projektarbeit, index) => <option value={projektarbeit}>{projektarbeit}</option>)
          :null}
        </NativeSelect>
      </FormControl>
        </div>
    </div>
    )
  }
}

ProjektarbeitenSelection.propTypes = {
  aktivität: PropTypes.any,
  handleSelection: PropTypes.any,
  user: PropTypes.any,
}

export default ProjektarbeitenSelection
