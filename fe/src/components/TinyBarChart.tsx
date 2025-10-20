import { Bar, BarChart } from "recharts";
import type { Campaign } from "../types";
import type { FC } from "react";

type TinyBarChartProps = {
  campaigns: Campaign;
};

export const TinyBarChart: FC<TinyBarChartProps> = ({ campaigns }) => {

  const campaignsToChartData = () => {
    return Object.entries(campaigns).map(([key, value]) => ({
      name: key,
      uv: value,
    }));
  }

  return (
    <BarChart
      style={{ width: '100%', maxHeight: '300px'}}
      responsive
      data={campaignsToChartData()}
    >
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );
};