import React, { Component } from 'react';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import OneAPI from '../../api/OneAPI';



export class ProjectSelection extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      selectedProject: '',
      project: null
    };
  }

  componentDidMount() {
    this.getMembershipByUser()
  }

  getMembershipByUser = () => {
    OneAPI.getAPI().getMembershipByUser(this.props.user[0].id).then(project =>
      this.setState({
        project: project
      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
          project: null,
        })
      );
    // set loading to true
    this.setState({
    });
  }
  /** gets the balance for this account */


  handleChange = (event) => {
    this.setState({
      selectedProject: event.target.value
    });
    setTimeout(() => {
      if(this.state.selectedProject){
    this.props.handleSelection(this.state.selectedProject);
  }}, 300);
}


  render() {
    const {user} = this.props;
    const {selectedProject, project} = this.state;
    return (
      <div>
        <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Projekt
        </InputLabel>
        <NativeSelect
          defaultValue={0}
          inputProps={{
            name: 'project',
            id: 'uncontrolled-native',
          }}
          onChange={this.handleChange}
        >
          <option value={0}></option>
          {project ?
          project.map((project, index) => <option value={project.id}>{project.getProjektname()}</option>)
          :null}
        </NativeSelect>
      </FormControl>
        </div>
    </div>
    )
  }
}

ProjectSelection.propTypes = {
  handleSelection: PropTypes.any,
  user: PropTypes.any
}

export default ProjectSelection
