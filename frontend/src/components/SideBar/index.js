import React, { Component } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import ProfileDropDown from '../ProfileDropDown'
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
    const {user, dbuser} = this.props;
    return (
        <>
      <div className={this.props.Open}>
            <div className="SideBarIcon" onClick={this.handleOpenStateChange}>
                <CloseIcon/>
            </div>
            <div className="SideBarWrapper">
                <div className="SideBarProfile">
                <ProfileDropDown user={this.props.user} dbuser={dbuser} Ahorizontol='center' Avertical='center' Thorizontol='right' Tvertical='top'/>
                </div>
                <div className="SideBarMenu">
                    <Link to='/MeineProjekte' onClick={this.handleOpenStateChange} className="SideBarLink">Projekte</Link>
                    <Link to='/Zeiterfassung' onClick={this.handleOpenStateChange} className="SideBarLink">Zeiterfassung</Link>
                    <Link to='/Arbeitszeitkonto' onClick={this.handleOpenStateChange} className="SideBarLink">Arbeitszeitkonto</Link>
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
    user: PropTypes.object,
    dbuser: PropTypes.any
}

export default SideBar