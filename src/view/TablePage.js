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

const styles = {

}

class TablePage extends Component {

    componentWillMount(){
        const { slideActions } = this.props;
        slideActions.retrieveChart('SPYS');
        slideActions.retrieveChart('SPH');
        slideActions.retrieveChart('SPDS');
    }

  render() {

    const { slide } = this.props;

    return (
        <Paper elevation={2} >
        <Grid container direction="column" spacing={24}>
            <Grid item xs={12}>
                
                    <SimpleLineChart
                        data =  {slide.spys}
                        xDataKey = 'year' 
                        type='monotone'
                        tableName= 'Slides Per Year'
                    />
            
            </Grid>
            <Divider inset={true} />
            <Grid item xs={12}>
                
                    <StackedAreaChart
                        data = {slide.spys}
                        xDataKey = 'year'
                        type = 'monotone'
                        tableName = 'Total Slides per Yaer'
                    />
               
            </Grid>
            
            <Grid item xs={12}>
                
                    <Grid container direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <ActivePieChart
                                data = {slide.sph}
                                tableName = 'Rate of Slides per Hospital'
                                innerRadius = {60}
                                outerRadius = {80}
                            />
                        </Grid>
                    </Grid>
                
            </Grid>
            <Grid item xs={12}>
                
                    <StackedAreaChart
                        data = {slide.spds}
                        xDataKey = 'diagnosis'
                        type = 'monotone'
                        tableName = 'Total Slides per Diagnosis'
                    />
                
            </Grid>
        </Grid>
        </Paper>
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
