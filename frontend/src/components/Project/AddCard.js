import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Project.css'
import add from '../../media/add.svg'

export class AddCard extends Component {
    constructor(props) {
        super(props);
        // Init state
        this.state = {
          project: null,
        };
    }
  render() {
    return (
      <div class="ProjectCardWrapper">
        <Card class="ProjectCard">
        <CardContent class="addImgWrapper">
        <img class="addImg" src={add}></img>
      </CardContent>
      </Card>
      </div>
    )
  }
}

AddCard.propTypes = {
    project: PropTypes.any.isRequired,
  }
export default AddCard