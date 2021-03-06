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
      const {user, dbuser, toggle} = this.props
    return (
        <div className={this.state.nav}>
        <div className="navContainer">
        <Link to='/MeinProfil' className="navLink"><div className="navLogo">project.one</div></Link>
            <div className="navMobile" onClick={this.handleOpenStateChange}>
                    <MenuIcon/>
            </div>
            <ul className="navMenu">
                <li className="navItem">
                    <Link to='/MeineProjekte' className="navLink">Projekte</Link>
                </li>
                <li className="navItem">
                    <Link to='/Zeiterfassung' className="navLink">Zeiterfassung</Link>
                </li>
                <li className="navItem">
                    <Link to='/Arbeitszeitkonto' className="navLink">Arbeitszeitkonto</Link>
                </li>
                <ProfileDropDown user={user} dbuser={dbuser} Ahorizontol='center' Avertical='center' Thorizontol='right' Tvertical='top'/>
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
	nav: PropTypes.string,
    user: PropTypes.object,
    toggle: PropTypes.any,
    dbuser: PropTypes.any
}

export default NavBar
