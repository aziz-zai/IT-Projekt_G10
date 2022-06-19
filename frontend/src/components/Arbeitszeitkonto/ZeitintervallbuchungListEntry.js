import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export class ZeitintervallbuchungListEntry extends Component {

    // Init state
    constructor(props) {
        super(props);
    this.state = {
        expandState: false,
        ereignis1: null,
        ereignis1Year: null,
        ereignis1Month: null,
        ereignis1Day: null,
        ereignis1Hour: null,
        ereignis1Minute: null,
        ereignis1Second: null,
        ereignis2: null,
        ereignis2Year: null,
        ereignis2Month: null,
        ereignis2Day: null,
        ereignis2Hour: null,
        ereignis2Minute: null,
        ereignis2Second: null,
        erstellt_fuer: null,
        erstellt_von: null,
    };
  }

  getKommenById = () => {
    OneAPI.getAPI().getKommen(this.props.buchung.start).then(kommen =>{
        const ereignisZeitpunkt = new Date(kommen[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis1: kommen[0],
        ereignis1Year: year,
        ereignis1Month: month,
        ereignis1Day: day,
        ereignis1Hour: hour,
        ereignis1Minute: minute,
        ereignis1Second: seconds
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
    OneAPI.getAPI().getGehen(this.props.buchung.ende).then(gehen =>{
        const ereignisZeitpunkt = new Date(gehen[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis2: gehen[0],
        ereignis2Year: year,
        ereignis2Month: month,
        ereignis2Day: day,
        ereignis2Hour: hour,
        ereignis2Minute: minute,
        ereignis2Second: seconds
      })}
      ).catch(e =>
        this.setState({ // Reset state with error from catch 
        })
      );
    // set loading to true
    this.setState({

    });
  }
  getEreignis1ById = () => {
    OneAPI.getAPI().getEreignis(this.props.buchung.start).then(ereignis =>{
        const ereignisZeitpunkt = new Date(ereignis[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis1: ereignis[0],
        ereignis1Year: year,
        ereignis1Month: month,
        ereignis1Day: day,
        ereignis1Hour: hour,
        ereignis1Minute: minute,
        ereignis1Second: seconds
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

  getEreignis2ById = () => {
    OneAPI.getAPI().getEreignis(this.props.buchung.ende).then(ereignis =>{
        const ereignisZeitpunkt = new Date(ereignis[0].zeitpunkt)
        const year = ereignisZeitpunkt.getFullYear()
        const month = ereignisZeitpunkt.getMonth()
        const day = ereignisZeitpunkt.getDate()
        const hour = ereignisZeitpunkt.getHours()
        const minute = ereignisZeitpunkt.getMinutes()
        const seconds = ereignisZeitpunkt.getSeconds()
        this.setState({
        ereignis2: ereignis[0],
        ereignis2Year: year,
        ereignis2Month: month,
        ereignis2Day: day,
        ereignis2Hour: hour,
        ereignis2Minute: minute,
        ereignis2Second: seconds
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

  getErstelltFuerById = () => {
    OneAPI.getAPI().getUser(this.props.buchung.erstellt_für).then(user =>
      this.setState({
        erstellt_fuer: user,

      })
      ).catch(e =>
        this.setState({ // Reset state with error from catch 

        })
      );
    // set loading to true
    this.setState({

    });
  }

  getErstelltVonById = () => {
    OneAPI.getAPI().getUser(this.props.buchung.erstellt_von).then(user =>
      this.setState({
        erstellt_von: user,
      })
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
  this.getErstelltFuerById();
  this.getErstelltVonById();
  }


componentDidMount() {
    
}
  render() {
      const {buchung} = this.props;
      const {expandState,  ereignis1, ereignis1Year, ereignis1Month, ereignis1Day,ereignis1Hour, ereignis1Minute, ereignis1Second, 
        ereignis2, ereignis2Year, ereignis2Month, ereignis2Day,ereignis2Hour, ereignis2Minute, ereignis2Second, erstellt_von, erstellt_fuer} = this.state;
    return (
      <div>
        <Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded={false} expanded={expandState} sx={{backgroundColor:"#5e2e942d", marginLeft: 1, marginRight:1}}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon onClick={this.handleExpandState}/>}
            id={`customer${buchung.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <div class="ereignisBuchungHeader">
                <Typography variant='body1' sx={{typography: 'heading'}}>{buchung.bezeichnung}: &nbsp;&nbsp;
                </Typography>  &nbsp;
                { ereignis2 ?
                <Typography variant='body1'><strong>{String(ereignis1Year).padStart(4, "0")}-{String(ereignis1Month).padStart(2, "0")}-{String(ereignis1Day).padStart(2, "0")}</strong> 
              <strong>{String(ereignis1Hour).padStart(2, "0")}:{String(ereignis1Minute).padStart(2, "0")}:{String(ereignis1Second).padStart(2, "0")}Uhr</strong> bis 
              <strong>{String(ereignis2Year).padStart(4, "0")}-{String(ereignis2Month).padStart(2, "0")}-{String(ereignis2Day).padStart(2, "0")}</strong> 
              <strong>{String(ereignis2Hour).padStart(2, "0")}:{String(ereignis2Minute).padStart(2, "0")}:{String(ereignis2Second).padStart(2, "0")}Uhr</strong> </Typography> :null}
               </div>
              </Grid>
              <Grid item>
                    {buchung.ist_buchung ?<Typography sx={{color: "green"}}> IST</Typography>:<Typography sx={{color: "red"}}> SOLL</Typography>}
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
                <Typography variant='body2' color={'textSecondary'}>Mehr Infos</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{backgroundColor:"#54377550"}}>
              {erstellt_von ?
              <div class="ersteller">
           {erstellt_von[0].vorname}  {erstellt_von[0].nachname}&nbsp;&nbsp;<DoubleArrowIcon sx={{color:"#5e2e94"}}/>&nbsp;&nbsp;{erstellt_fuer[0].vorname}  {erstellt_fuer[0].nachname}</div>:null}
          </AccordionDetails>
        </Accordion>
      </div>
    )
  }
}

ZeitintervallbuchungListEntry.propTypes = {
    buchung: PropTypes.any,
  }
export default ZeitintervallbuchungListEntry