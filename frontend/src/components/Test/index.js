import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import ProjectBO from '../../api/ProjectBO'
import PropTypes from 'prop-types'

export class Test extends Component {
    constructor(props) {
        super(props);
    
        // Init state
        this.state = {
          Test: null,
        };
      }
      getMembershipByUser = () => {
        OneAPI.getAPI().getMembershipByUser(this.props.user[0].id).then(Test =>
          this.setState({
            Test: Test
          })
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
              Test: null,
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
    const {Test} = this.state;
    const {user} = this.props;
    return (
      <div>
          {Test ?
          Test.map(Test => (Test.projektname)):null}
    </div>
      
    )
  }
}
Test.propTypes = {
    user: PropTypes.any.isRequired,
  }
export default Test