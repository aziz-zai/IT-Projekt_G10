import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import ProjectBO from '../../api/ProjectBO'

export class Project extends Component {
    constructor(props) {
        super(props);
    
        // Init state
        this.state = {
          project: null,
        };
      }
      getProjects = () => {
        OneAPI.getAPI().getProject(1).then(project =>
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
      componentDidMount() {
        this.getProjects();
      }
  render() {
    const {project} = this.state;
    return (
      <div>{
        project ?
        project[0].laufzeit:
        console.log('project fail',project)}</div>
      
    )
  }
}

export default Project