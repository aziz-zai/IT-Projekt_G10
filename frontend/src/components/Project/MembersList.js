import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AktivitätenBO from '../../api/AktivitätenBO';
import OneAPI from '../../api/OneAPI';
import { Dialog, Card, TextField, List, ListItem, Divider, } from '@mui/material';
import { Button, IconButton, DialogContent, DialogTitle, Typography, InputAdornment, MenuItem, DialogActions, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Aktivitäten.css'
import MembershipBO from '../../api/MembershipBO';

class MembersList extends Component {

    constructor(props) {
        super(props);
        let pn = '', lz= '', ag= '', ah= '';
    if (props.membership) {
      pn = props.membership.getProjektname();
      lz = props.membership.getLaufzeit();
      ag = props.membership.getAuftraggeber();
      ah = props.membership.getAvailablehours();
    }

   
    // Init an empty state
    this.state = {
      members: [],
      user: "",
    };
  }

  getMembers = () => {
    OneAPI.getAPI().getPotentialMembers(this.state.user, this.props.project)
      .then(membershipBOs =>
        this.setState({               // Set new state when CustomerBOs have been fetched
          members: membershipBOs,
        })).catch(e =>
          this.setState({             // Reset state with error from catch 
            members: [],
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  componentDidMount() {
    this.getMembers();
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{.getLastName()}, {customer.getFirstName()}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.editCustomerButtonClicked}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteCustomerButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of accounts</Typography>
              </Grid>
            </Grid>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  customerFilter: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
});

/** PropTypes */
CustomerList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(CustomerList));