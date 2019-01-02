import React ,{Component} from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const styles = theme => ({
  chartContainer: {
    marginLeft: 0,
  },
});

const stroke = [ "#82ca9d" , "#8884d8", "#4484d8", "#113458", "#41aff8", "#ff84d8" ];

// Line Type, data key, stroke, active Dot
class StackedAreaChart extends Component {
  render () {

    const { classes, data , xDataKey ,type, width, height, tableName } = this.props;

    return (
      <div>
      <Typography variant="h4" gutterBottom component="h2">
        {tableName}
      </Typography>
      <Typography component="div" className={classes.chartContainer}>
        <ResponsiveContainer width={width} height={height}>
            <AreaChart  data={data} margin={{top: 10, right: 30, left: 30, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={xDataKey}/>
            <YAxis/>
            <Tooltip/>
            {  data.length !== 0 && Object.keys(data[0]).map( (v, i)=>{
                if( i !== 0 ) return (
                    <Area key={i-1} type={type} dataKey={v} stackId='1' stroke={stroke[i-1]} fill={stroke[i-1]} />
                )}) }
        </AreaChart>
        </ResponsiveContainer>
      </Typography>
      </div>
    )
  }
}

StackedAreaChart.defaultProps = {
  width : "99%",
  height : 350,

}

StackedAreaChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data : PropTypes.array.isRequired,
  xDataKey : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  tableName : PropTypes.string.isRequired,
};


export default  withStyles(styles)(StackedAreaChart);