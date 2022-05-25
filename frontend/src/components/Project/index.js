import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI'
import ProjectBO from '../../api/ProjectBO'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
      <div>
          {project ?
          project.map(project => (project.projektname)):null}
    </div>
    <div>
        <Card>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Dein Projekt
      </Typography>
      <Typography variant="h5" component="div">
        projekt
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
    </Card>
    </div>
    </div>
      
    )
  }
}
Project.propTypes = {
    user: PropTypes.any.isRequired,
  }
export default Project