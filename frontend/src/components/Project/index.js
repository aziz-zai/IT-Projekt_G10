import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import PropTypes from 'prop-types'
import { SingleProject } from './SingleProject';


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

      getUserbygid = () => {
        OneAPI.getAPI().getUserGid(this.props.user.uid).then(user =>
          this.setState({
            user: user[0].id,
            loadingInProgress: false,
            loadingError: null
          })
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
              user: null,
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
      componentDidMount() {
        this.getMembershipByUser()
      }


  render() {
    const {project} = this.state;
    const {user} = this.props;
    
    return (
        <div>
      <div>
          {project ?
          project.map(project => <SingleProject project={project}/>):null}
    </div>
    </div>
    )
  }
}
Project.propTypes = {
    user: PropTypes.any.isRequired,
  }
export default Project