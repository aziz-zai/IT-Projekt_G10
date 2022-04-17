import './NavBar.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NavBar extends Component {
    constructor(props) {
        super(props);
    
        // Init the state
        this.state = {
          nav: this.props.nav,
        };
      }
  render() {
    return (
        <div className={this.state.nav}>
            {console.log('nav', this.state.nav)}
        <div className="navContainer">
            <div className="navLogo">project.one</div>
            <ul className="navMenu">
                <li className="navItem">
                    <Link to='/' className="navLink">Projekte</Link>
                </li>
                <li className="navItem">
                    <Link to='/' className="navLink">Zeiterfassung</Link>
                </li>
                <li className="navItem">
                    <Link to='/'className="navLink">Arbeitszeitkonto</Link>
                </li>
                <li className="navItem">
                    <Link to='/' className="navLink">Profil</Link>
                </li>
            </ul>
        </div>
    </div>
    )
  }
}

NavBar.propTypes = {
	/** @ignore */
	classes: PropTypes.object,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	nav: PropTypes.string.isRequired,
}

export default NavBar
