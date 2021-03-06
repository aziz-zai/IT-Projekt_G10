import React, { Component } from 'react';
import './Home.css'
import NavBar from '../components/NavBar'
import test from '../media/test.svg'
import PropTypes from 'prop-types'
import OneAPI from '../api/OneAPI'
import UserBO from '../api/UserBO';
import SideBar from '../components/SideBar'
import Project from '../components/Project'
import { getTabsUtilityClass } from '@mui/material';
import MyProfile from './MyProfile';


export class Home extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      loadingInProgress: false,
      loadingError: null,
      check: true
    };
  }

  componentDidMount() {
 
  }



  render() {
    const {Cuser, user} = this.props;
    return (
      <div>
    <div class="ProjectList">
      {user ?
      <Project user={user}/>
      : null}
    </div>
    </div>
    )
  }
}

Home.propTypes = {
  Cuser: PropTypes.any,
  user: PropTypes.any,
}

export default Home
