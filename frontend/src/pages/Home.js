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


export class Home extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      users: null,
      userid: null,
      loadingInProgress: false,
      loadingError: null,
      Open: 'SideBarContainerClosed',
      check: true
    };
  }

  componentDidMount() {
    this.getUserbygid();
  }

  /** gets the balance for this account */
  getUserbygid = () => {
    OneAPI.getAPI().getUserGid(this.props.user.uid).then(users =>
      this.setState({
        users: users,
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


  handleOpenStateChange = () => {
    if(this.state.Open =='SideBarContainerOpen'){
      this.setState({
        Open: 'SideBarContainerClosed'
      })
    }
    if(this.state.Open =='SideBarContainerClosed'){
		this.setState({
			Open: 'SideBarContainerOpen'
		})
  }
	}


  render() {
    const {user} = this.props;
    const {users, userid} = this.state;
    return (
      <div>
         <SideBar toggle={this.handleOpenStateChange} Open={this.state.Open} user={user}/>
         <NavBar toggle={this.handleOpenStateChange} user={user} nav="navBlack"/>
    <div className="test">

      {users ? 
      console.log('succes', users[0].vorname): console.log('fail', users)}
      {userid ? 
      console.log('succes', userid[0].vorname): console.log('fail', users)}
      <Project/>
    </div>
    </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Home
