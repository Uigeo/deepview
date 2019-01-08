import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnhancedTable from '../components/EnhancedTable';
import { Paper, Typography } from '@material-ui/core';

var titleStyle={
    fontSize : 40,
    textAlign : 'start'
}



class TablePage extends Component {
    render () {
        return (
            <div>
                <Typography variant="overline" style={titleStyle} > Slides </Typography>
                <Paper elevation={0} >
                    <EnhancedTable/>
                </Paper>
            </div>
            
            
        )
    }
}

export default connect(
    (state) => ({
        slide : state.slide.slides,
        totalNum : state.slide.totalNum
    })
)(TablePage);