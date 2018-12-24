import React, { Component } from 'react'
import { connect } from 'react-redux';
import SimpleLineChart from '../components/SimpleChartContainter';


class SimpleChartContainer extends Component {
    render () {
        return (
            <div>
                
            </div>
        )
    }
}



export default connect(
    ({state}) => {
        state : state.b
    }
)(SimpleChartContainer)