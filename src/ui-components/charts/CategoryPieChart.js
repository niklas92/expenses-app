import React from "react";
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import PieChart from "recharts/lib/chart/PieChart";
import Pie from "recharts/lib/polar/Pie";
import Cell from "recharts/lib/component/Cell";

const COLORS = [
  "#ffc107",
  "#009688",
  "#3f51b5",
  "#f44336",
  "#2196f3",
  "#cddc39",
  "#ff5722",
  "#00bcd4",
  "#673ab7",
  "#03a9f4",
];

function CategoryPieChart(props) {
  const totalAmount = props.chartData
    ? props.chartData.reduce((acc, e) => acc + Number(e.amount), 0)
    : 0;

  console.log("chartData: ", props.chartData);
  console.log("totalAmount: ", totalAmount);

  const pieData = props.chartData
    ? props.chartData.filter((e) => e.amount > 0)
    : [];

  const renderCustomizedLabel = ({ index }) => pieData[index].category;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <Pie
          data={pieData}
          dataKey="amount"
          nameKey="category"
          minAngle={0}
          cx="50%"
          cy="50%"
          fill="#82ca9d"
          label={renderCustomizedLabel}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryPieChart;
