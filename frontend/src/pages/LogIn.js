import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography} from '@material-ui/core';

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
			<div>
				<Typography  align='center' variant='h6'>Welcome to the LernApp</Typography>
				<Typography  align='center'>It appears, that you are not signed in.</Typography>
				<Typography  align='center'>To use the services of the LernApp please Sign in.</Typography>
				<Grid container justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleLogInButtonClicked}>
							Sign in with Google
      			</Button>
					</Grid>
				</Grid>
			</div>
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