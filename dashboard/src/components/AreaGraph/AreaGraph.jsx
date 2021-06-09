import React from "react";
import {
  AreaChart,
  Area,
  /*  XAxis,
  YAxis,
  CartesianGrid, */
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LineGraph({ width, height, data, dataKey, fillColor }) {
  return (
    <ResponsiveContainer width="100%" height="40%">
      <AreaChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: -10 }}
      >
        <Tooltip />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={fillColor}
          fill={fillColor}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
