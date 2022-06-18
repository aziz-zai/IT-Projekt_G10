import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export class EreignisbuchungListEntry extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
        expandState: false,
    };
  }
  
  handleExpandState = () => {
    this.setState({
        expandState: !this.state.expandState,
  });
  {console.log('expandState', this.state.expandState)}
  }

  
componentDidMount() {
}
  render() {
      const {ereignisbuchung} = this.props;
      const {expandState} = this.state;
    return (
      <div>{console.log('expandState', expandState)}
        <Accordion defaultExpanded={false} expanded={expandState} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon onClick={this.handleExpandState}/>}
            id={`customer${ereignisbuchung.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' sx={{typography: 'heading'}}>{ereignisbuchung.bezeichnung},
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' >
                    edit
                  </Button>
                  <Button color='secondary' >
                    delete
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of accounts</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  }
}

EreignisbuchungListEntry.propTypes = {
    ereignisbuchung: PropTypes.any,
  }
export default EreignisbuchungListEntry