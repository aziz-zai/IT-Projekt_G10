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
        ereignis: null,
        ereignisYear: null,
        ereignisMonth: null,
        ereignisDay: null,
        ereignisHour: null,
        ereignisMinute: null,
        ereignisSecond: null
    };
  }

  getKommenById = () => {
    OneAPI.getAPI().getKommen(this.props.ereignisbuchung.ereignis).then(kommen =>{
        const ereignisZeitpunkt = new Date(kommen[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis: kommen[0],
        ereignisYear: year,
        ereignisMonth: month,
        ereignisDay: day,
        ereignisHour: hour,
        ereignisMinute: minute,
        ereignisSecond: seconds
      })}
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }

  getGehenById = () => {
    OneAPI.getAPI().getGehen(this.props.ereignisbuchung.ereignis).then(gehen =>{
        const ereignisZeitpunkt = new Date(gehen[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis: gehen[0],
        ereignisYear: year,
        ereignisMonth: month,
        ereignisDay: day,
        ereignisHour: hour,
        ereignisMinute: minute,
        ereignisSecond: seconds
      })}
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }
  getEreignisById = () => {
    OneAPI.getAPI().getEreignis(this.props.ereignisbuchung.ereignis).then(ereignis =>{
        const ereignisZeitpunkt = new Date(ereignis[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis: ereignis[0],
        ereignisYear: year,
        ereignisMonth: month,
        ereignisDay: day,
        ereignisHour: hour,
        ereignisMinute: minute,
        ereignisSecond: seconds
      })
        }
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }
  handleExpandState = () => {
    this.setState({
        expandState: !this.state.expandState,
  });
  {console.log('expandState', this.state.expandState)}
  }


componentDidMount() {
    if(this.props.ereignisbuchung.bezeichnung=='Arbeitsbeginn'){
        this.getKommenById();
    }
    else if(this.props.ereignisbuchung.bezeichnung=='Arbeitsende'){
        this.getGehenById();
    }
    else{
        this.getEreignis();
    }
}
  render() {
      const {ereignisbuchung} = this.props;
      const {expandState,  ereignis, ereignisYear, ereignisMonth, ereignisDay,ereignisHour, ereignisMinute, ereignisSecond} = this.state;
    return (
      <div>{console.log('ereignis', ereignis)}
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
              { ereignis ? <div>{String(ereignisYear).padStart(4, "0")}-{String(ereignisMonth).padStart(2, "0")}-{String(ereignisDay).padStart(2, "0")} &nbsp;
              {String(ereignisHour).padStart(2, "0")}:{String(ereignisMinute).padStart(2, "0")}:{String(ereignisSecond).padStart(2, "0")} </div>:null} sads
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