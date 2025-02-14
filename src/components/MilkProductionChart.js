import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Feb 1", milk: 50 },
  { date: "Feb 2", milk: 55 },
  { date: "Feb 3", milk: 60 },
  { date: "Feb 4", milk: 62 },
  { date: "Feb 5", milk: 58 },
];

const MilkProductionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="milk" stroke="#ffa500" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MilkProductionChart;
