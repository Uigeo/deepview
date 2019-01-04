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
import colorPalette from '../colorPalette';
import SimpleAreaChart from '../components/SimpleAreaChart';


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
    textAlign: 'center',
    color : colorPalette[3]
  },
  chartTitle :{
    color : colorPalette[4]
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
            <Paper className={classes.paper} elevation={10}>
              <Typography variant="headline" component="h5" className={classes.chartTitle} >
                Total Number of Slides
              </Typography>
              <Grid container alignItems='center' justify='center' style={{height: '99%'}} >
                <Typography variant="h1" component="h1" className={classes.total}>
                  {slide.totalNum}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} elevation={10}>
            <Typography variant="headline" component="h5" className={classes.chartTitle}>
                Slides per year
            </Typography>
            <SimpleAreaChart data={slide.spy} xDataKey="year" dataKey='count' chartColor={colorPalette[1]} />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} elevation={10}>
              <Typography variant="headline" component="h5" className={classes.chartTitle}>
                  #Slides per Hospital
              </Typography>
              <ResponsiveContainer width="99%" height={300} alignItems="center">
                <PieChart  margin={{top: 40}}>
                  <Pie  isAnimationActive={true}  data={slide.sph} outerRadius={90} innerRadius={20}  fill={colorPalette[0]} label/>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper} elevation={10}>
              <Typography variant="headline" component="h5" className={classes.chartTitle}> #Slides per diagnosis </Typography>
              <ResponsiveContainer width="99%" height={300} alignItems="center">
              <BarChart data={slide.spds}
                          margin={{top: 40, right: 10, left: 10, bottom: 0}} maxBarSize={20}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="diagnosis"/>
                  <YAxis />
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="HYUMC" stackId="a" fill={colorPalette[0]} />
                  <Bar dataKey="KBSMC" stackId="a" fill={colorPalette[2]} />
                  <Bar dataKey="KUMC" stackId="a" fill={colorPalette[3]}  />
                  <Bar dataKey="SMC" stackId="a" fill={colorPalette[1]}  />
              </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

        </Grid>
        <Grid container spacing={24} alignItems="stretch" direction="row" justify="space-around">
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={10}>
            <Typography variant="headline" component="h5" className={classes.chartTitle}> Slides rate per year </Typography>
              <ResponsiveContainer width='99%' height={400}>
                <AreaChart  data={slide.spys} stackOffset="expand"
                        margin={{top: 40, right: 0, left: 0, bottom: 0}} >
                    <XAxis dataKey="year"/>
                    <YAxis tickFormatter={toPercent}/>
                    <Legend/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='HYUMC' stackId="1" stroke={colorPalette[0]} fill={colorPalette[0]} />
                    <Area type='monotone' dataKey='KBSMC' stackId="1" stroke={colorPalette[2]} fill={colorPalette[2]} />
                    <Area type='monotone' dataKey='KUMC' stackId="1" stroke={colorPalette[3]} fill={colorPalette[3]} />
                    <Area type='monotone' dataKey='SMC' stackId="1" stroke={colorPalette[1]} fill={colorPalette[1]} />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={10} >
            <Typography variant="headline" component="h5" className={classes.chartTitle}> #Slides per Hospiter </Typography>
              <ResponsiveContainer width='99%' height={400}>
              <BarChart data={slide.sphs} layout='vertical'
                  margin={{top: 40, right: 0, left: 0, bottom: 5}}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis type='number' />
                  <YAxis  dataKey="hospital" type='category'/>
                  <Tooltip/>
                  <Legend />
                  <Bar dataKey="2016" fill={colorPalette[2]} />
                  <Bar dataKey="2017" fill={colorPalette[3]}/>
                  <Bar dataKey="2018" fill={colorPalette[1]}/>
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

