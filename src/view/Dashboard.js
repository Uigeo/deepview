import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend }  from 'recharts';
//import { className } from 'postcss-selector-parser';
import {AreaChart, Area, PieChart, Pie} from 'recharts';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as slideActions from '../modules/slides';


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


class Dashboard extends React.Component {

  componentWillMount(){
    const { slideActions } = this.props;
    slideActions.retrieveTotalNum();
    slideActions.retrieveChart('SPY');
    slideActions.retrieveChart('SPH');
    slideActions.retrieveChart('SPDS');
    slideActions.retrieveChart('SPYS');
    slideActions.retrieveChart('SPHS');
  }
  
  render () {
 
    const { classes, slide } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignItems="stretch" direction="row" justify="space-around">
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" component="h5">
                Total Number of Slides
              </Typography>
              <Grid container alignItems='center' justify='center' style={{height: '99%'}} >
                <Typography variant="h2" component="h1" className={classes.total}>
                  {slide.totalNum}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
            <Typography  component="h5">
                Slides per year
            </Typography>
            <ResponsiveContainer width="99%" height={300}>
              <BarChart  data={slide.spy} margin={{top: 40, right: 0, left: 0, bottom: 0}} maxBarSize={20}>
                <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="year" tickSize={2} height={20}/>
                  <Tooltip/>
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h7" component="h5">
                  #Slides per Hospital
              </Typography>
              <ResponsiveContainer width="99%" height={300} alignItems="center">
                <PieChart  margin={{top: 40}}>
                  <Pie  isAnimationActive={true}  data={slide.sph} outerRadius={70} fill="#8884d8" label/>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Typography variant="h7" component="h5"> #Slides per diagnosis </Typography>
              <ResponsiveContainer width="99%" height={300} alignItems="center">
              <BarChart data={slide.spds}
                          margin={{top: 40, right: 10, left: 10, bottom: 0}} maxBarSize={20}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="diagnosis"/>
                  <YAxis/>
                  <Tooltip/>
                  
                  <Bar dataKey="AS" stackId="a" fill="#8884d8" />
                  <Bar dataKey="HY" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="KR" stackId="a" fill="#443a5d" />
                  <Bar dataKey="SE" stackId="a" fill="#223f4d" />
              </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

        </Grid>
        <Grid container spacing={24} alignItems="stretch" direction="row" justify="space-around">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <Typography variant="h7" component="h5"> Slides rate per year </Typography>
              <ResponsiveContainer width='99%' height={400}>
                <AreaChart  data={slide.spys} stackOffset="expand"
                        margin={{top: 40, right: 0, left: 0, bottom: 0}} >
                    <XAxis dataKey="year"/>
                    <YAxis tickFormatter={toPercent}/>
                    <Legend/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='AS' stackId="1" stroke='#8884d8' fill='#8884d8' />
                    <Area type='monotone' dataKey='HY' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                    <Area type='monotone' dataKey='KR' stackId="1" stroke='#ffc658' fill='#ffc658' />
                    <Area type='monotone' dataKey='SE' stackId="1" stroke='#ffc658' fill='#11c658' />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
            <Typography variant="h7" component="h5"> Slides rate per year </Typography>
              <ResponsiveContainer width='99%' height={400}>
              <BarChart data={slide.sphs} layout='vertical'
                  margin={{top: 40, right: 0, left: 0, bottom: 5}}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis type='number' />
                  <YAxis  dataKey="hospital" type='category'/>
                  <Tooltip/>
                  <Legend />
                  <Bar dataKey="G1" fill="#8884d8" />
                  <Bar dataKey="G2" fill="#82ca9d" />
                  <Bar dataKey="G3" fill="#441233" />
                  <Bar dataKey="G4" fill="#221387" />
                  <Bar dataKey="G5" fill="#14DDEE" />
              </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};


export default compose(
  withStyles(styles),
  connect(
      (state) => ({
          slide : state.slide,
      }),
      (dispatch) => ({
          slideActions : bindActionCreators(slideActions, dispatch)
      })
  )
)(Dashboard);

