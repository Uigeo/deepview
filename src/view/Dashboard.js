import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import compose from "recompose/compose";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as slideActions from "../modules/slides";
import colorPalette from "../colorPalette";
import SimpleAreaChart from "../components/SimpleAreaChart";
import StackedBarChart from "../components/StackedBarChart";
import SimplePieChart from "../components/SimplePieChart";
import StackedRateAreaChart from "../components/StackedRateAreaChart";
import HorizonBarChart from "../components/HorizonBarChart";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "start",
    color: theme.palette.text.secondary,
    height : '90%'
  },
  total: {
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    color: colorPalette[3]
  },
  chartTitle: {
    color: colorPalette[4]
  },
  pageTitle: {
    color: "#333333",
    marginBottom: 20,
    textAlign: "start",
    fontSize: 50
  }
});

class Dashboard extends React.Component {
  componentWillMount() {
    const { slideActions } = this.props;
    slideActions.retrieveTotalNum();
    slideActions.retrieveChart("SPY");
    slideActions.retrieveChart("SPH");
    slideActions.retrieveChart("SPDS");
    slideActions.retrieveChart("SPYS");
    slideActions.retrieveChart("SPHS");
  }

  render() {
    const { classes, slide } = this.props;
    const elev = 0;
    return (
      <div >
   
      
          <Grid
            container
            spacing={24}
            alignItems="stretch"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={elev}>
                <Typography
                  variant="headline"
                  component="h5"
                  className={classes.chartTitle}
                >
                  Total Number of Slides
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ height: "99%" }}
                >
                  <Typography
                    variant="h1"
                    component="h1"
                    className={classes.total}
                  >
                    {slide.totalNum}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={elev}>
                <Typography
                  variant="headline"
                  component="h5"
                  className={classes.chartTitle}
                >
                  Slides per year
                </Typography>
                <SimpleAreaChart
                  data={slide.spy}
                  xDataKey="year"
                  dataKey="count"
                  chartColor={colorPalette[1]}
                />
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={elev}>
                <Typography
                  variant="headline"
                  component="h5"
                  className={classes.chartTitle}
                >
                  #Slides per Institution
                </Typography>

                <SimplePieChart
                  width="99%"
                  height={300}
                  chartData={slide.sph}
                  margin={{ top: 40, right: 10, left: 10, bottom: 0 }}
                  fillColor={colorPalette[1]}
                  outerRadious={70}
                  innerRadious={20}
                  nameKey="name"
                  dataKey="value"
                />
              </Paper>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper} elevation={elev}>
                <Typography
                  variant="headline"
                  component="h5"
                  className={classes.chartTitle}
                >
                  
                  #Slides per Institution
                </Typography>
                <HorizonBarChart
                  margin={{ top: 40, right: 0, left: 5, bottom: 0 }}
                  data={slide.sphs}
                  yDataKey="hospital"
                  fillColors={colorPalette}
                  width="99%"
                  height={350}
                />
              </Paper>
            </Grid>
          
          
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper} elevation={elev}>
                <Typography
                  variant="headline"
                  component="h5"
                  className={classes.chartTitle}
                >
                  
                  Slides rate per year
                </Typography>

                <StackedRateAreaChart
                  margin={{ top: 40, right: 0, left: 0, buttom: 0 }}
                  width="99%"
                  height={500}
                  xDataKey="year"
                  data={slide.spys}
                  fillColor={colorPalette}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper} elevation={elev}>
                <Typography
                  variant="headline"
                  component="h5"
                  className={classes.chartTitle}
                >
                  #Slides per diagnosis
                </Typography>
                <StackedBarChart
                  widht="99%"
                  height={500}
                  margin={{ top: 40, right: 10, left: 10, bottom: 0 }}
                  chartData={slide.spds}
                  barColors={colorPalette}
                />
              </Paper>
            </Grid>
          </Grid>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};


export default compose(
  withStyles(styles),
  connect(
    state => ({
      slide: state.slide
    }),
    dispatch => ({
      slideActions: bindActionCreators(slideActions, dispatch)
    })
  )
)(Dashboard);
