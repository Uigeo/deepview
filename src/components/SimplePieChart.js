import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import PropTypes from "prop-types";
import Tooltip from "recharts/lib/component/Tooltip";

const SimplePieChart = props => {
  const {
    margin,
    width,
    height,
    chartData,
    outerRadious,
    innerRadious,
    fillColor,
    nameKey,
    dataKey
  } = props;

  return (
    <ResponsiveContainer width={width} height={height} alignItems="center">
      <PieChart margin={margin}>
        {chartData !== 0 && (
          <Pie
            isAnimationActive={true}
            data={chartData}
            outerRadious={outerRadious}
            innerRadious={innerRadious}
            fill={fillColor}
            nameKey={nameKey}
            dataKey={dataKey}
            label
          />
        )}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

SimplePieChart.propTypes = {
  width: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.object,
  chartData: PropTypes.array.isRequired,
  fillColor: PropTypes.string,
  nameKey: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  outerRadious: PropTypes.number.isRequired,
  innerRadious: PropTypes.number.isRequired
};

SimplePieChart.defaultProps = {
  width: "99%",
  height: 300,
  margin: { top: 40, right: 10, left: 10, bottom: 0 },
  fillColor: "#5bc0de",
  nameKey: "name",
  dataKey: "value",
  outerRadious: 70,
  innerRadious: 20
};

export default SimplePieChart;
