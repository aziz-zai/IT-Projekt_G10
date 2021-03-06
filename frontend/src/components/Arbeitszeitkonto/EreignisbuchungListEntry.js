import PropTypes from "prop-types";
import React, { Component } from "react";
import OneAPI from "../../api/OneAPI";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Ereignisbuchung.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TimerIcon from "@mui/icons-material/Timer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import LoadingProgress from "../Dialogs/LoadingProgress";

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
      ereignisSecond: null,
      erstellt_fuer: null,
      erstellt_von: null,
      loading: false
    };
  }

  // Hole das Kommen der ereignisbuchung
  getKommenById = () => {
    OneAPI.getAPI()
      .getKommen(this.props.ereignisbuchung.ereignis)
      .then((kommen) => {
        const ereignisZeitpunkt = new Date(kommen[0].zeitpunkt);
        const year = ereignisZeitpunkt.getFullYear();
        const month = ereignisZeitpunkt.getMonth();
        const day = ereignisZeitpunkt.getDate();
        const hour = ereignisZeitpunkt.getHours();
        const minute = ereignisZeitpunkt.getMinutes();
        const seconds = ereignisZeitpunkt.getSeconds();
        this.setState({
          ereignis: kommen[0],
          ereignisYear: year,
          ereignisMonth: month,
          ereignisDay: day,
          ereignisHour: hour,
          ereignisMinute: minute,
          ereignisSecond: seconds,
          loading: false
        });
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({loading: true});
  };

  
  // Hole das Gehen der ereignisbuchung
  getGehenById = () => {
    OneAPI.getAPI()
      .getGehen(this.props.ereignisbuchung.ereignis)
      .then((gehen) => {
        const ereignisZeitpunkt = new Date(gehen[0].zeitpunkt);
        const year = ereignisZeitpunkt.getFullYear();
        const month = ereignisZeitpunkt.getMonth();
        const day = ereignisZeitpunkt.getDate();
        const hour = ereignisZeitpunkt.getHours();
        const minute = ereignisZeitpunkt.getMinutes();
        const seconds = ereignisZeitpunkt.getSeconds();
        this.setState({
          ereignis: gehen[0],
          ereignisYear: year,
          ereignisMonth: month,
          ereignisDay: day,
          ereignisHour: hour,
          ereignisMinute: minute,
          ereignisSecond: seconds,
          loading: false
        });
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({loading: true});
  };
  
  // Hole das Ereignis der ereignisbuchung
  getEreignisById = () => {
    OneAPI.getAPI()
      .getEreignis(this.props.ereignisbuchung.ereignis)
      .then((ereignis) => {
        const ereignisZeitpunkt = new Date(ereignis[0].zeitpunkt);
        const year = ereignisZeitpunkt.getFullYear();
        const month = ereignisZeitpunkt.getMonth();
        const day = ereignisZeitpunkt.getDate();
        const hour = ereignisZeitpunkt.getHours();
        const minute = ereignisZeitpunkt.getMinutes();
        const seconds = ereignisZeitpunkt.getSeconds();
        this.setState({
          ereignis: ereignis[0],
          ereignisYear: year,
          ereignisMonth: month,
          ereignisDay: day,
          ereignisHour: hour,
          ereignisMinute: minute,
          ereignisSecond: seconds,
          loading: false
        });
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({loading: true});
  };

  //Hole User f??r den du das erstellt hast
  getErstelltFuerById = () => {
    OneAPI.getAPI()
      .getUser(this.props.ereignisbuchung.erstellt_f??r)
      .then((user) =>
        this.setState({
          erstellt_fuer: user,
          loading: false
        })
      )
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({loading: true});
  };

  
  // Hole User von dem das erstellt wurde
  getErstelltVonById = () => {
    OneAPI.getAPI()
      .getUser(this.props.ereignisbuchung.erstellt_von)
      .then((user) =>
        this.setState({
          erstellt_von: user,
          loading: false
        })
      )
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({loading: true});
  };

  
  // L??sche die Ereignisbuchung
  deleteEreignisbuchung = () => {
    OneAPI.getAPI()
      .deleteEreignisbuchung(this.props.ereignisbuchung.id)
      .then((buchung) => {
        this.setState({});
        if (this.props.istBuchung) {
          this.props.ereignisbuchungIstDeleted(this.props.ereignisbuchung);
        } else {
          this.props.ereignisbuchungSollDeleted(this.props.ereignisbuchung);
        }
      })
      .catch((e) =>
        this.setState({
          // Reset state with error from catch
        })
      );
    // set loading to true
    this.setState({});
  };
  handleExpandState = () => {
    this.setState({
      expandState: !this.state.expandState,
    });
    {
      console.log("expandState", this.state.expandState);
    }
    this.getErstelltFuerById();
    this.getErstelltVonById();
  };

  componentDidMount() {
    if (this.props.ereignisbuchung.bezeichnung == "Arbeitsbeginn") {
      this.getKommenById();
    } else if (this.props.ereignisbuchung.bezeichnung == "Arbeitsende") {
      this.getGehenById();
    } else {
      this.getEreignisById();
    }
  }
  render() {
    const { ereignisbuchung } = this.props;
    const {
      expandState,
      ereignis,
      ereignisYear,
      ereignisMonth,
      ereignisDay,
      ereignisHour,
      ereignisMinute,
      ereignisSecond,
      erstellt_von,
      erstellt_fuer,
      loading} = this.state;
    return (
      <div>
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          defaultExpanded={false}
          expanded={expandState}
          sx={{ backgroundColor: "#5e2e942d", marginLeft: 1, marginRight: 1 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon onClick={this.handleExpandState} />}
            id={`customer${ereignisbuchung.getID()}accountpanel-header`}
          >
            {loading ?
            <LoadingProgress show={loading}/>:
            <>
            <Grid
              container
              spacing={1}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <TimerIcon />
              </Grid>
              <Grid item>
                <div class="ereignisBuchungHeader">
                  <Typography variant="body1" sx={{ typography: "heading" }}>
                    <strong>{ereignisbuchung.bezeichnung}:</strong> &nbsp;&nbsp;
                  </Typography>{" "}
                  &nbsp;
                  {ereignis ? (
                    <div class="ereignisContainer">
                      <div class="ereignis">
                        {String(ereignisYear).padStart(4, "0")}-
                        {String(ereignisMonth).padStart(2, "0")}-
                        {String(ereignisDay).padStart(2, "0")}
                      </div>
                      &nbsp; um &nbsp;
                      <div class="ereignis">
                        {String(ereignisHour).padStart(2, "0")}:
                        {String(ereignisMinute).padStart(2, "0")}:
                        {String(ereignisSecond).padStart(2, "0")}Uhr
                      </div>
                    </div>
                  ) : null}
                </div>
              </Grid>
              <Grid item>
                {ereignisbuchung.ist_buchung ? (
                  <Typography sx={{ color: "green" }}> IST</Typography>
                ) : (
                  <Typography sx={{ color: "red" }}> SOLL</Typography>
                )}
              </Grid>
              <Grid item>
                <ButtonGroup variant="text" size="small">
                  <Button color="primary">
                    <EditIcon />
                  </Button>
                  <Button
                    color="secondary"
                    onClick={this.deleteEreignisbuchung}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant="body2" color={"textSecondary"}>
                  Mehr Infos
                </Typography>
              </Grid>
            </Grid></>}
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#54377550" }}>
            {erstellt_von ? (
              <div class="ersteller">
                {erstellt_von[0].vorname} {erstellt_von[0].nachname}&nbsp;&nbsp;
                <DoubleArrowIcon sx={{ color: "#5e2e94" }} />
                &nbsp;&nbsp;{erstellt_fuer[0].vorname}{" "}
                {erstellt_fuer[0].nachname}
              </div>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

EreignisbuchungListEntry.propTypes = {
  ereignisbuchung: PropTypes.any,
  ereignisbuchungSollDeleted: PropTypes.any,
  ereignisbuchungIstDeleted: PropTypes.any,
  istBuchung: PropTypes.any,
};
export default EreignisbuchungListEntry;
