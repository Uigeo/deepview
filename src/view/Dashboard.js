import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend }  from 'recharts';
import { className } from 'postcss-selector-parser';
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

const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;
  
  return toPercent(ratio, 2);
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



const bardata = [
  {year: '2015', pv: 4000, },
  {year: '2016', pv: 3000, },
  {year: '2017', pv: 2000, },
  {year: '2018', pv: 2780, },
  {year: '2019', pv: 1890, },
];


const piedata = [
	{name: "Group A", value: 400}, 
  {name: "Group B", value: 300},
  {name: "Group C", value: 300}, 
  {name: "Group D", value: 200},
  {name: "Group E", value: 278}, 
  {name: "Group F", value: 189}
  ];

  const stackdata = [
    {progress: '1', uv: 4000, pv: 2400, amt: 2400},
    {progress: '2', uv: 3000, pv: 1398, amt: 2210},
    {progress: '3', uv: 2000, pv: 9800, amt: 2290},
    {progress: '4', uv: 2780, pv: 3908, amt: 2000},
    {progress: '5', uv: 1890, pv: 4800, amt: 2181},
];

const data1 = [
    {year: '2014', h1: 4000, h2: 2400, h3: 2400},
    {year: '2015', h1: 3000, h2: 1398, h3: 2210},
    {year: '2016', h1: 2000, h2: 9800, h3: 2290},
    {year: '2017', h1: 2780, h2: 3908, h3: 2000},
    {year: '2018', h1: 1890, h2: 4800, h3: 2181},
];

const data2 = [
    {hospital: 'AS', p1: 4000, p2: 2400, p3: 2400, p4:1000},
    {hospital: 'SS', p1: 3000, p2: 1398, p3: 2210, p4:1242},
    {hospital: 'HY', p1: 2000, p2: 9800, p3: 2290, p4:1421},
    {hospital: 'KR', p1: 2780, p2: 3908, p3: 2000, p4:2444},
    {hospital: 'YS', p1: 1890, p2: 4800, p3: 2181, p4:3433},
    {hospital: 'SU', p1: 2390, p2: 3800, p3: 2500, p4:2423},
    {hospital: 'KA', p1: 3490, p2: 4300, p3: 2100, p4:3111} 
];