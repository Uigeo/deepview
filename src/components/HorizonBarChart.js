import React from "react";
import PropTypes from "prop-types";
import Bar from "recharts/lib/cartesian/Bar";
import BarChart from "recharts/lib/chart/BarChart";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import Legend from "recharts/lib/component/Legend";
import Tooltip from "recharts/lib/component/Tooltip";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";

const HorizonBarChart = props => {
  const { margin, data, yDataKey, type, width, height, fillColors } = props;

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data} margin={margin} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey={yDataKey} type="category" />
        <Legend />
        <Tooltip />
        {data.length !== 0 &&
          Object.keys(data[0])
            .sort()
            .reverse()
            .slice(1)
            .map((v, i) => {
              return (
                <Bar key={i} type={type} dataKey={v} fill={fillColors[i]} />
              );
            })}
      </BarChart>
    </ResponsiveContainer>
  );
};

HorizonBarChart.PropTypes = {
  width: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.object,
  data: PropTypes.array.isRequired,
  fillColors: PropTypes.array
};

HorizonBarChart.defaultPropts = {
  width: "99%",
  height: 300,
  type: "monotone",
  margin: { top: 40, right: 10, left: 10, bottom: 0 },
  yDataKey: "hospital",
  fillColors: [
    "#d9534f",
    "#5bc0de",
    "#5cb85c",
    "#428bca",
    "#777777",
    "#f9f9f9",
    "#dfe3ee"
  ]
};

export default HorizonBarChart;
