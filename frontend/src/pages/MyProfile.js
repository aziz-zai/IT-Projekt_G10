import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import OneAPI from '../api/OneAPI'
import PropTypes from 'prop-types'
export class MyProfile extends Component {
    constructor(props) {
        super(props);
        // Init state
        this.state = {
          user: null
        };
      }
      componentDidMount() {
        this.getUserbygid();
      }
    getUserbygid = () => {
            OneAPI.getAPI().getUserGid(this.props.userid.uid).then(user =>
              this.setState({
                user: user,

              })
              ).catch(e =>
                this.setState({ // Reset state with error from catch 

                })
              );
            // set loading to true
            this.setState({

            });
          }
    
  
    render() {  
    return (
      <div>{this.state.user ?
        <div>{this.state.user[0]}</div>
        :console.log('failed', this.state.user)
          }
      </div>
    )
  }
}

MyProfile.propTypes = {
    userid: PropTypes.object.isRequired,
  }

export default MyProfile