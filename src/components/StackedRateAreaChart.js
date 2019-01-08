import React from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import AreaChart from 'recharts/lib/chart/AreaChart';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Legend from 'recharts/lib/component/Legend';
import Tooltip from 'recharts/lib/component/Tooltip';
import Area from 'recharts/lib/cartesian/Area';
import PropTypes from 'prop-types';

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

const StackedRateAreaChart = (props) => {
    
    const { margin, data , xDataKey, type,  width, height, fillColors } = props;

    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart data={data} margin={margin} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis datakey={xDataKey}/>
                <YAxis tickFormatter={toPercent}/>
                <Legend/>
                <Tooltip/>
                    {data.length !== 0 && Object.keys(data[0]).slice(1).map( (v, i)=>{
                        return (
                        <Area key={i} type={type} dataKey={v} stackId='1' stroke={fillColors[i]} fill={fillColors[i]} />
                    )})}
           
            </AreaChart>
        </ResponsiveContainer>
    )
}

StackedRateAreaChart.propTypes = {
    margin : PropTypes.object,
    width : PropTypes.string,
    xDataKey : PropTypes.string,
    data : PropTypes.array.isRequired,
    height : PropTypes.number,
    fillColors : PropTypes.array.isRequired
}

StackedRateAreaChart.defaultProps = {
    margin : {top:40, right: 0, left:0, buttom : 0},
    width : '99%',
    height : 400,
    xDataKey : 'year',
    type : 'monotone',
    fillColors : ["#d9534f",  "#5bc0de", "#5cb85c", "#428bca", "#777777" ,"#f9f9f9", "#dfe3ee"]
}

export default StackedRateAreaChart