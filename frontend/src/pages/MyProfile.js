import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import OneAPI from '../api/OneAPI'
import PropTypes from 'prop-types'
export class MyProfile extends Component {
    constructor(props) {
        super(props);
        // Init state
        this.state = {
        };
      }

    render() {  
      const {user} = this.props;
    return (
      <div>
        {user?
        <div>{user[0].benutzername}</div>
        :null}
      </div>
    )
  }
}

MyProfile.propTypes = {
    user: PropTypes.any.isRequired,
  }

export default MyProfile