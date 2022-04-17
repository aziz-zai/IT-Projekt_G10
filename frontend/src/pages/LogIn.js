import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogIn.css'
import Video from '../media/background.mp4'
import NavBar from '../components/NavBar'

export class LogIn extends Component {
	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleLogInButtonClicked = () => {
		this.props.onLogIn();
	}
	/** Renders the sign in page, if user objext is null */
	render() {
  
		const { classes } = this.props;
		return (
            <>
                <NavBar/>
			<div className="homeContainer">
                <div className="homeBackground">
                    <video className="homeVideo" autoPlay loop muted src={Video} type='video/mp4' ></video>
                </div>
                <div className="homeContent">
                    <h1 className="homeTitle">Project.ONE</h1>
                    <p className="homeText">Wir helfen dir deine Projekte zu organisieren!</p>
                    <div className="btnContainer">
                        <button className="homeBtn" onClick={this.handleLogInButtonClicked}>Sign In</button>
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