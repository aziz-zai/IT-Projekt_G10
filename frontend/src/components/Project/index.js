import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import ProjectBO from '../../api/ProjectBO'
import PropTypes from 'prop-types'

export class Project extends Component {
    constructor(props) {
        super(props);
    
        // Init state
        this.state = {
          project: null,
          user: null
        };
      }
      getMembershipByUser = () => {
        OneAPI.getAPI().getMembershipByUser(1).then(project =>
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
            user: user,
            loadingInProgress: false,
            loadingError: null
          })
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
              users: null,
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
        this.getMembershipByUser();
      }


  render() {
    const {project, user} = this.state;
    return (
      <div>
          {project ?
          project[0].projektname: null}
    </div>
      
    )
  }
}
Project.propTypes = {
    user: PropTypes.object.isRequired,
  }
export default Project