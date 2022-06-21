import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Paper, Button} from '@mui/material';
import './Aktivitäten.css'
import './Project.css'
import DeleteIcon from '@mui/icons-material/Delete';
import OneAPI from '../../api/OneAPI';

export class ProjektarbeitDetails extends Component {
    constructor(props) {
        super(props);
      
        // Init state
        this.state = {
          deletingInProgress: false,
          deletingError: null,
          loadingInProgress: false,
          loadingError: null,
        };
         // save this state for canceling
        this.baseState = this.state;
    }

    deleteProjektarbeit = () => {
      OneAPI.getAPI().deleteProjektarbeit(this.projektarbeiten.id).then(() => {
        this.setState({  // Set new state when AccountBOs have been fetched
          deletingInProgress: false, // loading indicator 
          deletingError: null
        })
        // console.log(account);
        this.props.projektarbeitDeleted(this.projektarbeiten.id);  // call the parent with the deleted customer
      }).catch(e =>
        this.setState({ // Reset state with error from catch 
          deletingInProgress: false,
          deletingError: e
        })
      );
      // set loading to true
      this.setState({
        deletingInProgress: true,
        deletingError: null,
      });
    }
   

    render() {
        const {proarb_bes, proarb_bez} = this.props;
        const {projektarbeiten} = this.state;

    return (
      <Paper variant='outlined' class="papermitarbeiter">
        {proarb_bes} {proarb_bez}
        <Button><DeleteIcon onClick={this.deleteProjektarbeit} color="secondary"/>
          </Button>    
          {console.log("proarb", projektarbeiten)}
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

ProjektarbeitDetails.propTypes = {
  isOpen: PropTypes.any,
  onClose: PropTypes.any,
  classes: PropTypes.any,
  project: PropTypes.any,
  aktivität: PropTypes.any,
  proarb_bez: PropTypes.any,
  proarb_bes: PropTypes.any
};

export default ProjektarbeitDetails;