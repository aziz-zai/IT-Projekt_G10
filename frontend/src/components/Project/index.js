import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import PropTypes from 'prop-types'
import { SingleProject } from './SingleProject';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import add from '../../media/add.svg'


export class Project extends Component {
    constructor(props) {
        super(props);
    
        // Init state
        this.state = {
          project: null,
        };
      }
      getMembershipByUser = () => {
        OneAPI.getAPI().getMembershipByUser(this.props.user[0].id).then(project =>
          this.setState({
            project: project
          })
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
              project: null,
            })
          );
        // set loading to true
        this.setState({
        });
      }

      getUserbygid = () => {
        OneAPI.getAPI().getUserGid(this.props.user.uid).then(user =>
          this.setState({
            user: user[0].id,
            loadingInProgress: false,
            loadingError: null
          })
          ).catch(e =>
            this.setState({ // Reset state with error from catch 
              user: null,
              loadingInProgress: false,
              loadingError: e
            })
          );
        // set loading to true
        this.setState({
          loadingInProgress: true,
          loadingError: null
        });
      }
      componentDidMount() {
        this.getMembershipByUser()
      }


  render() {
    const {project} = this.state;
    const {user} = this.props;
    
    return (
        <div>
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 4, md: 12}}>
        
       { project ?
        project.map((project, index) => (
          <Grid item xs={2} sm={2} md={2.5} key={index}>
            <SingleProject project={project}/>
          </Grid>)):
          null
  }
  <Grid item xs={2} sm={2} md={2.5}>
  <Card class="ProjectCard">
      <CardContent class="addImgWrapper">
        <img class="addImg" src={add}></img>
      </CardContent>
      </Card>
          </Grid>
      </Grid>
    </Box>
    </div>
    )
  }
}
Project.propTypes = {
    user: PropTypes.any.isRequired,
  }
export default Project