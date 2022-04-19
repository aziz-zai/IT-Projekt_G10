import React, { Component } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import './SideBar.css'

export class SideBar extends Component {

    constructor(props) {
        super(props);
    
        // Init the state
        this.state = {
        };
      }

      handleOpenStateChange = () => {
		this.props.toggle()
	}
    
  render() {
    return (
        <>
      <div className={this.props.Open}>
            <div className="SideBarIcon" onClick={this.handleOpenStateChange}>
                <MenuIcon/>
            </div>
            <div className="SideBarWrapper">
                <div className="SideBarMenu">
                    <Link to='/' onClick={this.handleOpenStateChange} className="SideBarLink">Projekte</Link>
                    <Link to='/' onClick={this.handleOpenStateChange} className="SideBarLink">Zeiterfassung</Link>
                    <Link to='/' onClick={this.handleOpenStateChange} className="SideBarLink">Arbeitszeitkonto</Link>
                </div>
            </div>
      </div>
      </>
    )
  }
}

SideBar.propTypes = {
    toggle: PropTypes.any,
    Open: PropTypes.any,
}

export default SideBar