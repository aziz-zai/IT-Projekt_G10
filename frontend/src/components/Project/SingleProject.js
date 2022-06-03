import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Project.css'
import OneAPI from '../../api/OneAPI';

export class SingleProject extends Component {
    constructor(props) {
        super(props);
        // Init state
        this.state = {
          projektleiter: [],
          projektfarbe: "ProjectCard",
          projekttitel: "ProjektTitel"
        };
    }

    getProjektleiterByProject = () => {
      OneAPI.getAPI().getProjektleiterByProject(this.props.project.id).then(projektleiter =>
        this.handleProjektfarbe(projektleiter)
        ).catch(e =>
          this.setState({ // Reset state with error from catch 
            projektleiter: null,
          })
        );
      // set loading to true
      this.setState({
      });
    }

    handleProjektfarbe = (projektleiter) => {
      if(projektleiter[0].id == this.props.user){
        this.setState({
          projektfarbe:"ProjectCard-PL",
          projekttitel:"ProjektTitel-PL"
        })
      }
      this.setState({
        projektleiter: projektleiter
      })
    }

    componentDidMount() {
    this.getProjektleiterByProject();
    }

  render() {
    const {project} = this.props;
    const {projektleiter, projektfarbe, projekttitel} = this.state
    return (
      <div class="ProjectCardWrapper">
        <Card class={projektfarbe}>
      <CardContent>
        <Typography variant="h5" class={projekttitel} component="div">
          {project.projektname}
        </Typography>
        <Typography variant="body2"class="ProjektContent" >
          Verfügbare Stunden: {project.availablehours}h<br/>
          Deadline: 0{project.laufzeit}.04.2022<br/>
          Projektleiter: {projektleiter[0] ?
           projektleiter[0].vorname : null}
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
    project: PropTypes.any,
    user: PropTypes.any,
  }
export default SingleProject