import './App.css'
import React from 'react';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import { Navigate } from 'react-router'
import NavBar from './components/NavBar'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebaseconfig';
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';

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

	 /** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	* @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
	*/
static getDerivedStateFromError(error) {
   // Update state so the next render will show the fallback UI.
   return { appError: error };
}

/** 
* Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	* @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	* @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	*/
handleSignIn = () => {
   this.setState({
	   authLoading: true
   });

   const app = initializeApp(firebaseConfig);
   //const auth = getAuth(app);
   const auth = getAuth(app);
   const provider = new GoogleAuthProvider();

   auth.languageCode = 'en';
   signInWithRedirect(auth, provider);
}


/**
* Lifecycle method, which is called when the component gets inserted into the browsers DOM.
* Initializes the firebase SDK.
* 
* @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
*/
componentDidMount() {
   const app = initializeApp(firebaseConfig);
   const auth = getAuth(app);

   auth.languageCode = 'en';
   onAuthStateChanged(auth, (user) => {
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
			   // console.log("Token is: " + document.cookie);

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
   });
}


	/** Renders the whole app */
	render() {
    const { currentUser, appError, authError, authLoading } = this.state;
		return (
        <>
		
				<Router>
					<Routes>
						<Route>
						<Route path={process.env.PUBLIC_URL + '/'} element={
							currentUser ?
							<Navigate replace to={process.env.PUBLIC_URL + '/home'} />
							:
							<LogIn  onLogIn={this.handleSignIn} />
						}/>
						<Route path={process.env.PUBLIC_URL + '/'} element={
							currentUser ?
							<Navigate replace to={process.env.PUBLIC_URL + '/home'} />
							:
							<LogIn  onLogIn={this.handleSignIn} />
						}/>


                  		<Route path="/home" element={<Secured user={currentUser}><Home user={currentUser}/></Secured>} />
				  		</Route>
					</Routes>
				</Router>
        </>
		);
	}
}

export default App;

function Secured(props) {
	let location = useLocation();

	if (!props.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to={process.env.PUBLIC_URL + '/'} state={{ from: location }} replace />;
	}

	return props.children;
}