import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import PropTypes from 'prop-types'
import { SingleProject } from './SingleProject';
import Grid from '@mui/material/Grid';
import AddCard from './AddCard';


export class Project extends Component {
    constructor(props) {
        super(props);
    
        // Init state
        this.state = {
          project: null,
        };
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

      componentDidMount() {
        this.getMembershipByUser()
      }


  render() {
    const {project} = this.state;
    return (
<div class="ProjectCardWrapper">
    <Grid container spacing={{ xs: 4, md: 6, xl: 8}} columns={{ xs: 1, sm: 6, md: 8, xl: 12}}>
       {project ?
        project.map((project, index) => (
          <Grid item xs={1} sm={2} md={1.7} xl={1.5} key={index}>
            <SingleProject project={project}/>
          </Grid>)):
          null}
  <Grid item xs={1} sm={2} md={1.7} xl={1.5}>
      <AddCard/>
  </Grid> 
  </Grid>
  </div>
    )
  }
}

Project.propTypes = {
    user: PropTypes.any.isRequired,
  }
export default Project