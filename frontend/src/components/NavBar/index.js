import './NavBar.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProfileDropDown  from '../ProfileDropDown'
import MenuIcon from '@mui/icons-material/Menu';

export class NavBar extends Component {
    constructor(props) {
        super(props);
    
        // Init the state
        this.state = {
          nav: this.props.nav,
        };
      }

      handleOpenStateChange = () => {
		this.props.toggle()
	}
  render() {
      const {user, toggle} = this.props
    return (
        <div className={this.state.nav}>
        <div className="navContainer">
            <div className="navLogo">project.one</div>
            <div className="navMobile" onClick={this.handleOpenStateChange}>
                    <MenuIcon/>
            </div>
            <ul className="navMenu">
                <li className="navItem">
                    <Link to='/MyProfile' className="navLink">Projekte</Link>
                </li>
                <li className="navItem">
                    <Link to='/' className="navLink">Zeiterfassung</Link>
                </li>
                <li className="navItem">
                    <Link to='/'className="navLink">Arbeitszeitkonto</Link>
                </li>
                <ProfileDropDown user={user} Ahorizontol='center' Avertical='center' Thorizontol='right' Tvertical='top'/>
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
    user: PropTypes.object,
    toggle: PropTypes.any,
}

export default NavBar
