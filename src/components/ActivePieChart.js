import React ,{Component} from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Sector from 'recharts/lib/shape/Sector';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const styles = theme => ({
  chartContainer: {
    marginLeft: 0,
  },
});

const stroke = [ "#82ca9d" , "#8884d8", "#4484d8", "#113458", "#41aff8", "#ff84d8" ];

class ActivePieChart extends Component {


    state = {
        activeIndex: 0
    }


    onPieEnter = (data, activeIndex) => {
        
        this.setState({ activeIndex });
    }
    
  render () {
    const { classes, data , innerRadius, outerRadius, fill, width, height } = this.props;

    return (
      <div>
        <ResponsiveContainer width={width} height={height} >
            { data.length != 0 && 
            <PieChart >
                 <Pie 
                     activeIndex={this.state.activeIndex}
                     activeShape={renderActiveShape} 
                     data={data} 
                     innerRadius={innerRadius}
                     outerRadius={outerRadius} 
                     fill={fill}
                     onMouseEnter={this.onPieEnter}
                 />
            </PieChart>
            }
        </ResponsiveContainer>
       
      </div>
    )
  }
}

ActivePieChart.defaultProps = {
  width : 500,
  height : 300,
  innerRadius : 60,
  outerRadius : 100,
  fill : "#82ca9d"
}

ActivePieChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data : PropTypes.array.isRequired,
  tableName : PropTypes.string.isRequired,
};


export default withStyles(styles)(ActivePieChart);


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text fontSize={30} x={cx} y={cy} dy={5} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text fontSize={20} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`#${value}`}</text>
        <text fontSize={20} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  