import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip'
import Bar from 'recharts/lib/cartesian/Bar';
import BarChart from 'recharts/lib/chart/BarChart';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';


const StackedBarChart = props => {

    const { chartData, margin, xDataKey, width, height, barColors } = props;

    return (
        <div>
            <ResponsiveContainer width={width} height={height}>
                <BarChart 
                    data={chartData}
                    margin={margin}
                >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={xDataKey} />
                <YAxis/>
                <Tooltip/>
                {chartData.length !== 0 && Object.keys(chartData[0]).slice(1).map(
                    (v, i)=>(<Bar dataKey={v} stackId='a' fill={barColors[i]}/>)
                )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}



StackedBarChart.propTypes = {
  width : PropTypes.string,
  height : PropTypes.number,
  margin : PropTypes.object,
  chartData : PropTypes.array.isRequired,
  barColors : PropTypes.array,
}

StackedBarChart.defaultProps ={
    width : "99%",
    height : 300,
    margin : { top:40, right :10, left : 10, bottom : 0 },
    xDataKey : 'diagnosis',
    barColors : ["#d9534f",  "#5bc0de", "#5cb85c", "#428bca", "#777777" ,"#f9f9f9", "#dfe3ee"]
}

export default StackedBarChart