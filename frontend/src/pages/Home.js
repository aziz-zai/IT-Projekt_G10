import React, { Component } from 'react';
import './Home.css'
import NavBar from '../components/NavBar'
import test from '../media/test.svg'
import PropTypes from 'prop-types'
import OneAPI from '../api/OneAPI'


export class Home extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      users: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  /** gets the balance for this account */
  getUsers = () => {
    OneAPI.getAPI().getUsers().then(users =>
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


  render() {
    return (
      <div>
         <NavBar nav="navBlack"/>
    <div className="test">
        <img src={test}></img>
        <h1>Die Seite steht ist noch in Bearbeitung!</h1>
        {this.state.users.map(user =><div key={user.id_}>{user.vorname} {console.log('users:'+ user)}</div> )}
    </div>
    </div>
    )
  }
}

export default Home
