import './App.css'
import React from 'react';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navigate } from 'react-router'
import NavBar from './components/NavBar'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseconfig';


class App extends React.Component {
	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** Handles firebase users logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

	/** Renders the whole app */
	render() {
    const { currentUser, appError, authError, authLoading } = this.state;
		return (
        <>
				<Router basename={process.env.PUBLIC_URL}>
          <NavBar/>
						{
							// Is a user signed in?
							currentUser ?
								<>
                  <Routes>
                  <Route exact path="/" element={<Home/>} />
                  <Route exact path="/LogIn" element={<LogIn onLogIn={this.handleSignIn} />} />
                  </Routes>
								</>
								:
								// else show the sign in page
								<>
                <LogIn onLogIn={this.handleSignIn} />
								</>
						}
				</Router>
        </>
		);
	}
}

export default App;