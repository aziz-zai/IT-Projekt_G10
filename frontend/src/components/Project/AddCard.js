import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Project.css'
import add from '../../media/add.svg'
import CreateProject from './CreateProject';
import Aktivitäten from './Aktivitäten';

export class AddCard extends Component {
    constructor(props) {
        super(props);
        // Init state
        this.state = {
          isOpen: false,
        };
    }

    handleClickOpen = () => {
      this.setState({
          isOpen:true
      })
    };
  
  handleClose = (project) => {
      this.setState({
          isOpen:false
      });
      this.props.onClose(project)
    };

  render() {
    return (
      <div class="ProjectCardWrapper">
        <Card onClick={this.handleClickOpen} class="AddProjectCard">
        <CardContent class="addImgWrapper">
        <img class="addImg" src={add}></img>
      </CardContent>
      </Card>
      <CreateProject user={this.props.user} isOpen={this.state.isOpen} handleClose={this.handleClose}/>
      </div>
    )
  }
}

AddCard.propTypes = {
    project: PropTypes.any,
    user: PropTypes.any,
    member: PropTypes.any,
    onClose: PropTypes.any,
  }
export default AddCard