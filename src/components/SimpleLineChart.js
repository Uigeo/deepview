import React ,{Component} from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
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
class SimpleLineChart extends Component {
  render () {

    const { classes, data , xDataKey ,type, width, height, dot } = this.props;

    return (
      <div>
 
      <Typography component="div" className={classes.chartContainer}>
        <ResponsiveContainer width={width} height={height}>
          <LineChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}} >
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {data.length !== 0 && Object.keys(data[0]).map( (v, i)=> {
              if(i !== 0) return (<Line key={i-1} type={type} dataKey={v} stroke={stroke[i-1]} activeDot={{r:dot}} />);   })
            }
          </LineChart>
        </ResponsiveContainer>
      </Typography>
      </div>
    )
  }
}

SimpleLineChart.defaultProps = {
  width : "99%",
  height : 350,
  dot : 7,
  data : undefined,
  type : 'monotone'
}

SimpleLineChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data : PropTypes.array.isRequired,
  xDataKey : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  dot : PropTypes.number,
};


export default  withStyles(styles)(SimpleLineChart);