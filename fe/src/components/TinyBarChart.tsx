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
      width={"100%"}
      height={300}
      data={campaignsToChartData()}
    >
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );
};