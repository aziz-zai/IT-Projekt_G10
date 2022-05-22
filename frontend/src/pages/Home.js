import React, { Component } from 'react';
import './Home.css'
import NavBar from '../components/NavBar'
import test from '../media/test.svg'
import PropTypes from 'prop-types'
import OneAPI from '../api/OneAPI'
import SideBar from '../components/SideBar'


export class Home extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      users: [],
      loadingInProgress: false,
      loadingError: null,
      Open: 'SideBarContainerClosed',
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  /** gets the balance for this account */
  getUsers = () => {
    OneAPI.getAPI().getUsers(1).then(users =>
      this.setState({
        users: users,
        loadingInProgress: false,
        loadingError: null
        
      })).catch(e =>
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
    const {user} = this.props
    return (
      <div>
         <SideBar toggle={this.handleOpenStateChange} Open={this.state.Open} user={user}/>
         <NavBar toggle={this.handleOpenStateChange} user={user} nav="navBlack"/>
    <div className="test">
        <img className="testimg" src={test}></img>
        <h1>Die Seite ist noch in Bearbeitung!</h1>
        {this.state.users.map(user =><div key={user.id_}>{user.vorname}</div> )}
    </div>
    </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Home
