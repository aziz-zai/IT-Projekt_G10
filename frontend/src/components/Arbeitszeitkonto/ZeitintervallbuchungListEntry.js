import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OneAPI from '../../api/OneAPI';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './Zeitintervallbuchung.css'

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
        zeitintervall: null,
    };
  }

  getKommenById = (zeitintervall) => {
    OneAPI.getAPI().getKommen(zeitintervall.start).then(kommen =>{
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

  getGehenById = (zeitintervall) => {
    OneAPI.getAPI().getGehen(zeitintervall.ende).then(gehen =>{
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
  getEreignis1ById = (zeitintervall) => {
    OneAPI.getAPI().getEreignis(zeitintervall.start).then(ereignis =>{
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

  getEreignis2ById = (zeitintervall) => {
    OneAPI.getAPI().getEreignis(zeitintervall.ende).then(ereignis =>{
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

  getProjektlaufzeit = () => {
    OneAPI.getAPI().getZeitintervall(this.props.buchung.zeitintervall).then(zeitintervall =>{
      this.setState({
        zeitintervall: zeitintervall[0],
      })
        return zeitintervall}
      ).then(zeitintervall=>{
        this.getEreignis1ById(zeitintervall[0]);
        this.getEreignis2ById(zeitintervall[0])
      }).catch(e =>
        this.setState({ // Reset state with error from catch 

        })
      );
    // set loading to true
    this.setState({

    });
  }

  getProjektarbeit = () => {
    OneAPI.getAPI().getProjektarbeit(this.props.buchung.zeitintervall).then(zeitintervall =>{
      this.setState({
        zeitintervall: zeitintervall[0],
      })
        return zeitintervall}
      ).then(zeitintervall => {
        this.getKommenById(zeitintervall[0]);
        this.getGehenById(zeitintervall[0])
      }).catch(e =>
        this.setState({ // Reset state with error from catch 

        })
      );
    // set loading to true
    this.setState({

    });
  }

  getAbwesenheit = () => {
    OneAPI.getAPI().getAbwesenheit(this.props.buchung.zeitintervall).then(zeitintervall =>{
      this.setState({
        zeitintervall: zeitintervall[0],
      })
      return zeitintervall}
      ).then(zeitintervall=>{
        this.getEreignis1ById(zeitintervall[0]);
        this.getEreignis2ById(zeitintervall[0])
      }).catch(e =>
        this.setState({ // Reset state with error from catch 

        })
      );
    // set loading to true
    this.setState({

    });
  }

  getPause = () => {
    OneAPI.getAPI().getPause(this.props.buchung.zeitintervall).then(zeitintervall =>{
      this.setState({
        zeitintervall: zeitintervall[0],
      })
      return zeitintervall}
      ).then(zeitintervall=>{
        this.getEreignis1ById(zeitintervall[0]);
        this.getEreignis2ById(zeitintervall[0])
      }).catch(e =>
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
  if(this.props.buchung){
    if(this.props.buchung.bezeichnung == 'Projektlaufzeit'){
      this.getProjektlaufzeit();
    }
    else if(this.props.buchung.bezeichnung == 'Projektarbeit'){
      this.getProjektarbeit();
    }
    else if(this.props.buchung.bezeichnung == 'Abwesenheit'){
      this.getAbwesenheit();
    }
    else if(this.props.buchung.bezeichnung == 'Pause'){
      this.getPause();
    }}
}
  render() {
      const {buchung} = this.props;
      const {expandState,  ereignis1, ereignis1Year, ereignis1Month, ereignis1Day,ereignis1Hour, ereignis1Minute, ereignis1Second, 
        ereignis2, ereignis2Year, ereignis2Month, zeitintervall, ereignis2Day,ereignis2Hour, ereignis2Minute, ereignis2Second, erstellt_von, erstellt_fuer} = this.state;
    return (
      <div>{console.log('intervall', ereignis1, ereignis2)}
        <Accordion TransitionProps={{ unmountOnExit: true }} defaultExpanded={false} expanded={expandState} sx={{backgroundColor:"#5e2e942d", marginLeft: 1, marginRight:1}}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon onClick={this.handleExpandState}/>}
            id={`customer${buchung.getID()}accountpanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Grid item>
                    <AccessTimeIcon/>
              </Grid>
              <Grid item>
                <div class="ereignisBuchungHeader">
                <Typography variant='body1' sx={{typography: 'heading', display: 'flex', flexDirection:'row'}}>{zeitintervall ? <strong>{zeitintervall.bezeichnung}:</strong>:null} &nbsp;&nbsp;
                </Typography>  &nbsp;
                { ereignis2 ?
              <div class="intervallContainer">
              <div class="intervall">{String(ereignis1Year).padStart(4, "0")}-{String(ereignis1Month).padStart(2, "0")}-{String(ereignis1Day).padStart(2, "0")} &nbsp;
              {String(ereignis1Hour).padStart(2, "0")}:{String(ereignis1Minute).padStart(2, "0")}:{String(ereignis1Second).padStart(2, "0")}</div>&nbsp;bis&nbsp;
              <div class="intervall">{String(ereignis2Year).padStart(4, "0")}-{String(ereignis2Month).padStart(2, "0")}-{String(ereignis2Day).padStart(2, "0")} &nbsp;
              {String(ereignis2Hour).padStart(2, "0")}:{String(ereignis2Minute).padStart(2, "0")}:{String(ereignis2Second).padStart(2, "0")}</div>
              </div> :null}
               </div>
              </Grid>
              <Grid item>
                    {buchung.ist_buchung ?<Typography sx={{color: "green"}}> IST</Typography>:<Typography sx={{color: "red"}}> SOLL</Typography>}
              </Grid>
              <Grid item>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' >
                  <EditIcon/>
                  </Button>
                  <Button color='secondary' >
                    <DeleteForeverIcon/>
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
              <div class="erstellerIntervall">
           {erstellt_von[0].vorname}  {erstellt_von[0].nachname}&nbsp;&nbsp;<DoubleArrowIcon sx={{color:"#5e2e94"}}/>&nbsp;&nbsp;{erstellt_fuer[0].vorname}  {erstellt_fuer[0].nachname}</div>:null}
              {(buchung.bezeichnung == 'Projektarbeit') ? zeitintervall ?<div>Tätigkeitsbeschreibung: {zeitintervall.beschreibung}</div>:null:null}
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