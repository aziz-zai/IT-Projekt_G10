import React, { Component } from 'react';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import OneAPI from '../../api/OneAPI';


export class AktivitätenSelection extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      selectedAktivität: '',
      aktivitäten: []
    };
  }

  componentDidMount() {
    this.loadAktivitäten()
  }

  loadAktivitäten = () => {
    OneAPI.getAPI().getAktivitätenByProjectId(this.props.project).then(aktivitäten =>
      this.setState({
        aktivitäten: aktivitäten,
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
  /** gets the balance for this account */


  handleChange = (event) => {
    this.setState({
      selectedAktivität: event.target.value
    })

    setTimeout(() => {
        if(this.state.selectedAktivität){
      this.props.handleSelection(this.state.selectedAktivität);
    }}, 300);
	}


  render() {
    const {} = this.props;
    const {selectedAktvität, aktivitäten} = this.state;
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Aktvität
        </InputLabel>
        <NativeSelect
          defaultValue={0}
          inputProps={{
            name: 'aktivitäten',
            id: 'uncontrolled-native',
          }}
          onChange={this.handleChange}
        >
            <option value={0}></option>
           {aktivitäten ?
          aktivitäten.map((aktivität, index) => <option value={aktivität.id}>{aktivität.getBezeichnung()}</option>)
          :null}
        </NativeSelect>{console.log('akti', aktivitäten)}
      </FormControl>
        </div>
    </div>
    )
  }
}

AktivitätenSelection.propTypes = {
    handleSelection: PropTypes.any,
    project: PropTypes.any
}

export default AktivitätenSelection
