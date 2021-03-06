import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import BarChart from "recharts/lib/chart/BarChart";
import Bar from "recharts/lib/cartesian/Bar";
import ReferenceLine from "recharts/lib/cartesian/ReferenceLine";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Legend from "recharts/lib/component/Legend";

function OverviewBarChart(props) {
  const { chartData, monAvgSavings } = props;

  const data = chartData
    .map((e) => ({
      month: e.month,
      amount: e.amount,
    }))
    .reverse();

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <ReferenceLine y={monAvgSavings} label="Average" stroke="red" />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default OverviewBarChart;
