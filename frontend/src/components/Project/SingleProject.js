import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <div><Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Dein Projekt
        </Typography>
        <Typography variant="h5" component="div">
          {this.props.project.projektname}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ohoo
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      </Card></div>
    )
  }
}

SingleProject.propTypes = {
    project: PropTypes.any.isRequired,
  }
export default SingleProject