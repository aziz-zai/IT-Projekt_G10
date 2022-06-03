import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Project.css'

export class SingleProject extends Component {
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
      <CardContent>
        <Typography variant="h5" class="ProjektTitel" component="div">
          {this.props.project.projektname}
        </Typography>
        <Typography variant="body2"class="ProjektContent" >
          Verfügbare Stunden: {this.props.project.availablehours}h<br/>
          Deadline: 0{this.props.project.laufzeit}.04.2022<br/>
          Projektleiter: Miray Sidal Yer
        </Typography>
        <CardActions disableSpacing class="learnBtnWrapper">
        <button class="learnBtn">Mehr Infos</button>
      </CardActions>
      </CardContent>
      </Card>
      </div>
    )
  }
}

SingleProject.propTypes = {
    project: PropTypes.any.isRequired,
  }
export default SingleProject