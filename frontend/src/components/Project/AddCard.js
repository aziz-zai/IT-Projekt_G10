import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Project.css'
import add from '../../media/add.svg'
import CreateProject from './CreateProject';

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
  
  handleClose = () => {
      this.setState({
          isOpen:false
      })
    };

  render() {
    return (
      <div class="ProjectCardWrapper">
        <Card onClick={this.handleClickOpen} class="AddProjectCard">
        <CardContent class="addImgWrapper">
        <img class="addImg" src={add}></img>
      </CardContent>
      </Card>
      <CreateProject isOpen={this.state.isOpen} handleClose={this.handleClose}/>
      </div>
    )
  }
}

AddCard.propTypes = {
    project: PropTypes.any,
  }
export default AddCard