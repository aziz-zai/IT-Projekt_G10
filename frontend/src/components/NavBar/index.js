import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div className="nav">
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

export default NavBar