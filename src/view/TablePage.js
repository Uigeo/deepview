import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as slideActions from '../modules/slides';
import SimpleLineChart from '../components/SimpleLineChart';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { Paper, Grid } from '@material-ui/core';
import StackedAreaChart from '../components/StackedAreaChart';
import ActivePieChart from '../components/ActivePieChart';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles = {
    sizedBox : {
        height : 300
    }
}

class TablePage extends Component {

    componentWillMount(){
        const { slideActions } = this.props;
        slideActions.retrieveChart('SPYS');
        slideActions.retrieveChart('SPH');
        slideActions.retrieveChart('SPDS');
    }

  render() {

    const { slide, classes } = this.props;

    return (
        
        
        <Grid container direction="column" spacing={24}>
            <Grid item xs={12} style={{height:150}} />
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom component="h2">
                    Slides Per Year
                </Typography>
                    <SimpleLineChart
                        data =  {slide.spys}
                        xDataKey = 'year' 
                        type='monotone'
                        height = {500}
                    />
            
            </Grid>

            <Grid item xs={12} className={classes.sizedBox} />

            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom component="h2">
                    Total Slides per Yaer
                </Typography>
                <StackedAreaChart
                        data = {slide.spys}
                        xDataKey = 'year'
                        type = 'monotone'
                    />
               
            </Grid>
            <Grid item xs={12} className={classes.sizedBox} alignItems='center' > </Grid>
            <Grid item xs={12}>
                
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item>
                        <Typography variant="h4" gutterBottom component="h2">
                            Rate of Slides per Hospital
                        </Typography>
                            <ActivePieChart
                                data = {slide.sph}
                                innerRadius = {90}
                                outerRadius = {120}
                                height = {500}
                                width = {600}
                            />
                        </Grid>
                    </Grid>
                
            </Grid>
            <Grid item xs={12} className={classes.sizedBox} />
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom component="h2">
                    Total Slides per Diagnosis
                </Typography>
                    <StackedAreaChart
                        data = {slide.spds}
                        xDataKey = 'diagnosis'
                        type = 'monotone'
                        tableName = 'Total Slides per Diagnosis'
                    />
                
            </Grid>
            <Grid item xs={12} className={classes.sizedBox} />
        </Grid>
       
    )
  }
}


export default compose(
    withStyles(styles),
    connect(
        (state) => ({
            slide : state.slide
        }),
        (dispatch) => ({
            slideActions : bindActionCreators(slideActions, dispatch)
        })
    )
  )(TablePage);
