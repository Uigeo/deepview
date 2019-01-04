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

// Line Type, data key, stroke, active Dot
class SimpleAreaChart extends Component {
  render () {

    const { classes, data , xDataKey , dataKey ,type, width, height, margin, chartColor } = this.props;

    return (
      <div>
      <Typography component="div" className={classes.chartContainer}>
        <ResponsiveContainer width={width} height={height}>
            <AreaChart  data={data} margin={margin}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={xDataKey}/>
            <YAxis/>
            <Tooltip/>
           
                    <Area  type={type} dataKey={dataKey} stackId='1' stroke={chartColor} fill={chartColor} />
           
        </AreaChart>
        </ResponsiveContainer>
      </Typography>
      </div>
    )
  }
}

SimpleAreaChart.defaultProps = {
  width : "99%",
  height : 350,
  type : 'monotone',
  chartColor : '#8884d8',
  margin : {top: 10, right: 0, left: 0, bottom: 0}
}

SimpleAreaChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data : PropTypes.array.isRequired,
  xDataKey : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  tableName : PropTypes.string.isRequired,
  chartColor : PropTypes.string.isRequired
};


export default  withStyles(styles)(SimpleAreaChart);