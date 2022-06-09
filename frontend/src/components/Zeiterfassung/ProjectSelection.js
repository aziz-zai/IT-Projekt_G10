import React, { Component } from 'react';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



export class ProjectSelection extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      project: '',
    };
  }

  componentDidMount() {
 
  }

  /** gets the balance for this account */


  handleChange = (event) => {
    this.setState({
      project: event.target.value
    });
    this.props.handleSelection(this.state.project);
	}


  render() {
    const {Cuser, user} = this.props;
    const {project} = this.state;
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Projekt
        </InputLabel>
        <NativeSelect
          defaultValue={project}
          inputProps={{
            name: 'project',
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

ProjectSelection.propTypes = {
  handleSelection: PropTypes.any,
}

export default ProjectSelection
