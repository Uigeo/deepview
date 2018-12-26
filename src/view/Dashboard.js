import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend }  from 'recharts';
import { className } from 'postcss-selector-parser';
import {PieChart, Pie} from 'recharts';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'start',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  total: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center'
  }
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} alignItems="stretch" direction="row" justify="space-around">
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography variant="h7" component="h5">
              Total Number of Slides
            </Typography>
            <Typography variant="h4" component="h1" className={classes.total}>
              10342#
            </Typography>
          </Paper>
        </Grid>
      
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
          <Typography variant="h7" component="h5">
              #Slides per yaer
            </Typography>
          <BarChart width={200} height={150} data={bardata} margin={{top: 0, right: 0, left: 0, bottom: 0}} maxBarSize={20}>
            <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="year" tickSize={2} height={20}/>
              <Tooltip/>
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography variant="h7" component="h5">
                #Slides per yaer
            </Typography>
            <PieChart width={200} height={150}>
              <Pie  isAnimationActive={true} data={piedata} cx={100} cy={75} outerRadius={50} fill="#8884d8" label/>
              <Tooltip/>
            </PieChart>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            xs=6 sm=3
          </Paper>
        </Grid>

      </Grid>
      <Grid container spacing={24} alignItems="stretch" direction="row" justify="space-around">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            xs=12 sm=6
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            xs=12 sm=6
          </Paper>
        </Grid>
      </Grid>


    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);




const bardata = [
  {year: '2015', pv: 4000, },
  {year: '2016', pv: 3000, },
  {year: '2017', pv: 2000, },
  {year: '2018', pv: 2780, },
  {year: '2019', pv: 1890, },
];


const piedata = [
	{name: 'Group A', value: 400}, 
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}, 
  {name: 'Group D', value: 200},
  {name: 'Group E', value: 278}, 
  {name: 'Group F', value: 189}
  ]