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
      <div><Card class="ProjectCard">
      <CardContent>
        <Typography variant="h5" class="ProjekTitel"component="div">
          {this.props.project.projektname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} >
          Auftraggeber: {this.props.project.auftraggeber}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing class="learnBtnWrapper">
        <button class="learnBtn">Mehr Infos</button>
      </CardActions>
      </Card></div>
    )
  }
}

SingleProject.propTypes = {
    project: PropTypes.any.isRequired,
  }
export default SingleProject