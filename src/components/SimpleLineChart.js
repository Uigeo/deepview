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


const data = [
  { year: '2013', AS: 5902, HY: 3546,  SS:3723},
  { year: '2014', AS: 7232, HY: 6567,  SS:2421},
  { year: '2015', AS: 6655, HY: 3364,  SS:3928},
  { year: '2016', AS: 3982, HY: 2353,  SS:7872},
  { year: '2017', AS: 4212, HY: 2634,  SS:1546},
  { year: '2018', AS: 4562, HY: 5445,  SS:1877},
  { year: '2019', AS: 6767, HY: 2153,  SS:3332},
];

const styles = theme => ({
  chartContainer: {
    marginLeft: 0,
  },
});


class SimpleLineChart extends Component {
  render () {

    const { classes } = this.props;

    return (
      <div>
      <Typography variant="h4" gutterBottom component="h2">
        Slide
      </Typography>
      <Typography component="div" className={classes.chartContainer}>
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={data}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="AS" stroke="#82ca9d" activeDot={{ r: 7 }}/>
            <Line type="monotone" dataKey="HY" stroke="#8884d8" activeDot={{ r: 7 }} />
            <Line type="monotone" dataKey="SS" stroke="#4484d8" activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </Typography>
      </div>
    )
  }
}


export default  withStyles(styles)(SimpleLineChart);