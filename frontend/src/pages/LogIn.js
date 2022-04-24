import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogIn.css'
import Video from '../media/background.mp4'
import NavBar from '../components/NavBar'
import { FcGoogle } from 'react-icons/fc';
import SideBar from '../components/SideBar'

export class LogIn extends Component {
	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
     constructor(props) {
        super(props);
    
        // Init the state
        this.state = {
          nav: "nav",
          Open: 'SideBarContainerClosed',

        };
      }
    
	handleLogInButtonClicked = () => {
		this.props.onLogIn();
	}

    handleOpenStateChange = () => {
		this.setState({
			Open: 'SideBarContainerOpen'
		})
	}

	/** Renders the sign in page, if user objext is null */
	render() {
  
		const { classes, user } = this.props;
		return (
            <>  
                <NavBar nav='navTrans'/>
			<div className="homeContainer">
                <div className="homeBackground">
                    <video className="homeVideo" autoPlay loop muted src={Video} type='video/mp4' ></video>
                </div>
                <div className="homeContent">
                    <h1 className="homeTitle">Project.ONE</h1>
                    <p className="homeText">Wir helfen dir deine Projekte zu organisieren!</p>
                    <div className="btnContainer">
                        <button className="homeBtn" onClick={this.handleLogInButtonClicked}><FcGoogle></FcGoogle>&nbsp; Sign In</button>
                    </div>
                </div>
            </div>
            </>
		);
	}
}

/** Component specific styles */

/** PropTypes */
LogIn.propTypes = {
	/** @ignore */
	classes: PropTypes.object,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onLogIn: PropTypes.func.isRequired,
}

export default LogIn;